#! /bin/sh

setVariables() {
    CHANNEL_NAME=$1
    ORG_GROUP_NAME=$2
    CC_NAME=$3
    PEER_NAME=$4
    ORG_NAME=$5
    MSP_NAME=$6
    PEER_PORT=$7
    shift;shift;shift;

    export PATH=$PWD/bin:$PATH
    export FABRIC_CFG_PATH=$PWD/config
    export CORE_PEER_MSPCONFIGPATH=$PWD/.build/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/users/Admin@$ORG_NAME.aomd.com/msp

    export CORE_PEER_TLS_ENABLED=true
    export CORE_PEER_LOCALMSPID=$MSP_NAME
    export CORE_PEER_TLS_ROOTCERT_FILE=$PWD/.build/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/peers/$PEER_NAME.$ORG_NAME.aomd.com/tls/ca.crt
    export CORE_PEER_MSPCONFIGPATH=$PWD/.build/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/users/Admin@$ORG_NAME.aomd.com/msp
    export CORE_PEER_ADDRESS=localhost:$PEER_PORT

    
    organizationCount=$(( ($# - 3) / 4))
    export QUERY_STRING="$QUERY_STRING --peerAddresses localhost:$PEER_PORT --tlsRootCertFiles ${PWD}/.build/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/peers/$PEER_NAME.$ORG_NAME.aomd.com/tls/ca.crt"
    shift;shift;shift;shift;

    while [ $organizationCount -gt 0 ]; do
        PEER_NAME=$1
        ORG_NAME=$2
        MSP_NAME=$3
        PEER_PORT=$4
        shift;shift;shift;shift;
        export QUERY_STRING="$QUERY_STRING --peerAddresses localhost:$PEER_PORT --tlsRootCertFiles ${PWD}/.build/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/peers/$PEER_NAME.$ORG_NAME.aomd.com/tls/ca.crt"

        organizationCount=$(( organizationCount - 1))
    done
}

getAll() {
    if [ $# != 1 ]; then
        echo "status:500 message:\"Invalid parameter\""
        return
    fi
    USER=$1
    peer chaincode query -C $CHANNEL_NAME -n $CC_NAME -c "{\"Args\":[\"getAll\", \"educationCC\", \"${CHANNEL_NAME}\", \"${USER}\"]}"
}

read() {
    if [ $# != 2 ]; then
        echo "status:500 message:\"Invalid parameter\""
        return
    fi
    USER=$1
    ASSETID=$2
    
    peer chaincode query -C $CHANNEL_NAME -n $CC_NAME -c "{\"Args\":[\"read\", \"educationCC\", \"$CHANNEL_NAME\", \"${USER}\", \"${ASSETID}\"]}"
}

create() {
    if [ $# != 6 ]; then
        echo "status:500 message:\"Invalid parameter\""
        return
    fi
    TITLE=$1
    OWNERID=$2
    PUBLISHER=$3
    PUBLISHEDAT=$4
    STATE=$5
    DEPARTMENTINFO=$6

    peer chaincode invoke -o localhost:9050 --ordererTLSHostnameOverride orderer.aomd.com --tls --cafile "${PWD}/.build/organizations/ordererOrganizations/orderer.aomd.com/orderers/orderer.aomd.com/msp/tlscacerts/tlsca.aomd.com-cert.pem" -C $CHANNEL_NAME -n $CC_NAME $QUERY_STRING -c "{\"function\":\"create\",\"Args\":[\"${TITLE}\", \"${OWNERID}\", \"${PUBLISHER}\", \"${PUBLISHEDAT}\", \"${STATE}\", \"${DEPARTMENTINFO}\"]}"
}

# exists() {
#     if [ $# != 1 ]; then
#         echo "status:500 message:\"Invalid parameter\""
#         return
#     fi
#     ID=$1
#     peer chaincode query -C $CHANNEL_NAME -n $CC_NAME -c "{\"Args\":[\"exists\", \"${ID}\"]}"
# }

if [ $1 = "getAll" ]; then
    setVariables educationchannel readOrganizations readCC peer0 readOrg ReadOrgMSP 5051
    getAll $2
elif [ $1 = "read" ]; then
    setVariables educationchannel readOrganizations readCC peer0 readOrg ReadOrgMSP 5051
    read $2 $3
elif [ $1 = "create" ]; then
    setVariables educationchannel educationOrganizations educationCC peer0 educationOrg1 EducationOrg1MSP 6051 peer0 educationOrg2 EducationOrg2MSP 6052 peer0 educationOrg3 EducationOrg3MSP 6053
    create $2 $3 $4 $5 $6 $7
# elif [ $1 = "exists" ]; then
#     setVariables educationchannel readOrganizations readCC peer0 readOrg ReadOrgMSP 5051
#     exists $2
fi