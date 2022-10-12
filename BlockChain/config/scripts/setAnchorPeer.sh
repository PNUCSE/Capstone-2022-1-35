#!/bin/bash

. scripts/utils.sh

function fetchChannelConfig() {
    MSP_NAME=$1
    ORG_GROUP_NAME=$2
    ORG_NAME=$3
    PEER_PORT=$4
    CHANNEL_NAME=$5
    ORDERER_PORT=9050 
    OUTPUT=${MSP_NAME}config.json

    export CORE_PEER_TLS_ENABLED=true
    export ORDERER_CA=${PWD}/organizations/ordererOrganizations/orderer.aomd.com/orderers/orderer.aomd.com/msp/tlscacerts/tlsca.aomd.com-cert.pem
    export CORE_PEER_LOCALMSPID=$MSP_NAME
    export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/peers/peer0.$ORG_NAME.aomd.com/tls/ca.crt
    export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/users/Admin@$ORG_NAME.aomd.com/msp
    export CORE_PEER_ADDRESS=localhost:$PEER_PORT

    infoln "채널 $CHANNEL_NAME의 config block의 최신 내용을 불러옵니다."
    set -x
    peer channel fetch config config_block.pb -o orderer.aomd.com:$ORDERER_PORT --ordererTLSHostnameOverride orderer.aomd.com -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
    { set +x; } 2>/dev/null

    infoln "config block을 json형태로 바꾸는 중입니다."
    set -x
    configtxlator proto_decode --input config_block.pb --type common.Block | jq .data.data[0].payload.data.config >"${OUTPUT}"
    { set +x; } 2>/dev/null
}

function createConfigUpdate() {
    CHANNEL_NAME=$1
    ORIGINAL=$2config.json
    MODIFIED=$2modified_config.json
    OUTPUT=$2anchors.tx

    set -x
    configtxlator proto_encode --input "${ORIGINAL}" --type common.Config >original_config.pb
    configtxlator proto_encode --input "${MODIFIED}" --type common.Config >modified_config.pb
    configtxlator compute_update --channel_id "${CHANNEL_NAME}" --original original_config.pb --updated modified_config.pb >config_update.pb
    configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate >config_update.json
    echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL_NAME'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . >config_update_in_envelope.json
    configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope >"${OUTPUT}"
    { set +x; } 2>/dev/null
}

MSP_NAME=$1
ORG_GROUP_NAME=$2
ORG_NAME=$3
PEER_PORT=$4
CHANNEL_NAME=$5
ORDERER_PORT=9050 
HOST=peer0.$ORG_NAME.aomd.com
export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/orderer.aomd.com/orderers/orderer.aomd.com/msp/tlscacerts/tlsca.aomd.com-cert.pem
export CORE_PEER_LOCALMSPID=$MSP_NAME
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/peers/peer0.$ORG_NAME.aomd.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/users/Admin@$ORG_NAME.aomd.com/msp
export CORE_PEER_ADDRESS=$HOST:$PEER_PORT

infoln "$CHANNEL_NAME의 configuration을 가져옵니다."

fetchChannelConfig $1 $2 $3 $4 $5

infoln "$CHANNEL_NAME의 $ORG_NAME에 anchor peer update tx를 생성합니다."

set -x

jq '.channel_group.groups.Application.groups.'${CORE_PEER_LOCALMSPID}'.values += {"AnchorPeers":{"mod_policy": "Admins","value":{"anchor_peers": [{"host": "'$HOST'","port": '$PEER_PORT'}]},"version": "0"}}' ${CORE_PEER_LOCALMSPID}config.json > ${CORE_PEER_LOCALMSPID}modified_config.json
{ set +x; } 2>/dev/null

createConfigUpdate ${CHANNEL_NAME} ${CORE_PEER_LOCALMSPID}