#!/bin/bash

function fetchChannelConfig() {
    MSP_NAME=$1
    ORG_GROUP_NAME=$2
    ORG_NAME=$3
    PEER_PORT=$4
    CHANNEL_NAME=$5
    OUTPUT=${MSP_NAME}config.json

    export CORE_PEER_TLS_ENABLED=true
    export ORDERER_CA=.build/organizations/ordererOrganizations/orderer.aomd.com/orderers/orderer.aomd.com/msp/tlscacerts/tlsca.aomd.com-cert.pem
    export CORE_PEER_LOCALMSPID=$MSP_NAME
    export CORE_PEER_TLS_ROOTCERT_FILE=.build/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/peers/peer0.$ORG_NAME.aomd.com/tls/ca.crt
    export CORE_PEER_MSPCONFIGPATH=.build/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/users/Admin@$ORG_NAME.aomd.com/msp
    export CORE_PEER_ADDRESS=localhost:$PEER_PORT

    infoln "채널 $CHANNEL_NAME의 config block의 최신 내용을 불러옵니다."
    set -x
    peer channel fetch config config_block.pb -o orderer.aomd.com:$PEER_PORT --ordererTLSHostnameOverride orderer.aomd.com -c $CHANNEL_name --tls --cafile $ORDERER_CA
    { set +x; } 2>/dev/null

    infoln "config block을 json형태로 바꾸는 중입니다."
    set -x
    configtxlator proto_decode --input config_block.pb --type common.Block | jq .data.data[0].payload.data.config >"${OUTPUT}"
    { set +x; } 2>/dev/null
}