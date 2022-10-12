#! /bin/bash

. config/scripts/utils.sh

function deployCCPeer() {
    CHANNEL_NAME=$1
    ORG_GROUP_NAME=$2
    CC_NAME=$3
    CC_VERSION=$4
    PEER_NAME=$5
    ORG_NAME=$6
    MSP_NAME=$7
    PEER_PORT=$8

    infoln "CC 패키지를 ${ORG_NAME}의 ${PEER_NAME}에게 설치합니다."

    export CORE_PEER_TLS_ENABLED=true
    export CORE_PEER_LOCALMSPID=$MSP_NAME
    export CORE_PEER_TLS_ROOTCERT_FILE=$PWD/.build/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/peers/$PEER_NAME.$ORG_NAME.aomd.com/tls/ca.crt
    export CORE_PEER_MSPCONFIGPATH=$PWD/.build/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/users/Admin@$ORG_NAME.aomd.com/msp
    export CORE_PEER_ADDRESS=localhost:$PEER_PORT

    peer lifecycle chaincode install $CC_NAME.tar.gz

    # 정상설치 되었는지 체크
    infoln "정상 설치되어 있는지 확인합니다"
    peer lifecycle chaincode queryinstalled >&log.txt
    PACKAGE_ID=$(sed -n "/${CC_NAME}_${CC_VERSION}/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
    echo $PACKAGE_ID

    # CC를 Org에게 배포합니다.
    infoln "${ORG_NAME}의 ${PEER_NAME}에게 CC 패키지를 승인 받습니다."
    peer lifecycle chaincode approveformyorg -o localhost:9050 --ordererTLSHostnameOverride orderer.aomd.com --channelID $CHANNEL_NAME --name $CC_NAME --version $CC_VERSION --package-id $PACKAGE_ID --sequence 1 --tls --cafile "${PWD}/.build/organizations/ordererOrganizations/orderer.aomd.com/orderers/orderer.aomd.com/msp/tlscacerts/tlsca.aomd.com-cert.pem"
}

function deployCCOrgnization() {
    CHANNEL_NAME=$1
    CC_NAME=$2
    CC_VERSION=$3    
    TARGET_NAME=$4
    local organizationCount=$(( ($# - 4) / 5))
    local queryString=""
    shift;shift;shift;shift;

    # CC 컴파일
    infoln "CC를 컴파일 합니다."

    cd chaincode/$TARGET_NAME
    ./gradlew installDist
    cd ../..

    # 채널에 첫 org를 추가
    ORG_GROUP_NAME=$1
    PEER_NAME=$2
    ORG_NAME=$3
    MSP_NAME=$4
    PEER_PORT=$5
    shift;shift;shift;shift;shift;
    export PATH=$PWD/bin:$PATH
    export FABRIC_CFG_PATH=$PWD/config
    export CORE_PEER_MSPCONFIGPATH=$PWD/.build/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/users/Admin@$ORG_NAME.aomd.com/msp
    queryString="$queryString --peerAddresses localhost:$PEER_PORT --tlsRootCertFiles ${PWD}/.build/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/peers/$PEER_NAME.$ORG_NAME.aomd.com/tls/ca.crt"

    # CC 배포를 위해 패키지화
    infoln " CC 배포를 위해 패키지화합니다."
    peer lifecycle chaincode package $CC_NAME.tar.gz --path chaincode/$TARGET_NAME/build/install --lang java --label ${CC_NAME}_${CC_VERSION}
    deployCCPeer $CHANNEL_NAME $ORG_GROUP_NAME $CC_NAME $CC_VERSION $PEER_NAME $ORG_NAME $MSP_NAME $PEER_PORT
    organizationCount=$(( organizationCount - 1))

    while [ $organizationCount -gt 0 ]; do
        ORG_GROUP_NAME=$1
        PEER_NAME=$2
        ORG_NAME=$3
        MSP_NAME=$4
        PEER_PORT=$5
        shift;shift;shift;shift;shift;
        queryString="$queryString --peerAddresses localhost:$PEER_PORT --tlsRootCertFiles ${PWD}/.build/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/peers/$PEER_NAME.$ORG_NAME.aomd.com/tls/ca.crt"

        deployCCPeer $CHANNEL_NAME $ORG_GROUP_NAME $CC_NAME $CC_VERSION $PEER_NAME $ORG_NAME $MSP_NAME $PEER_PORT

        organizationCount=$(( organizationCount - 1))
    done

    # 패키지 commit
    infoln "CC 패키지를 commit 합니다."
    peer lifecycle chaincode commit -o localhost:9050 --ordererTLSHostnameOverride orderer.aomd.com --channelID $CHANNEL_NAME --name $CC_NAME --version $CC_VERSION --sequence 1 --tls --cafile "${PWD}/.build/organizations/ordererOrganizations/orderer.aomd.com/orderers/orderer.aomd.com/msp/tlscacerts/tlsca.aomd.com-cert.pem" $queryString

    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name $CC_NAME
}

function deployCCOrgnizationAndInvoke() {
    CHANNEL_NAME=$1
    CC_NAME=$2
    CC_VERSION=$3    
    TARGET_NAME=$4
    local organizationCount=$(( ($# - 4) / 5))
    local queryString=""
    shift;shift;shift;shift;

    # CC 컴파일
    infoln "CC를 컴파일 합니다."

    cd chaincode/$TARGET_NAME
    ./gradlew installDist
    cd ../..

    # 채널에 첫 org를 추가
    ORG_GROUP_NAME=$1
    PEER_NAME=$2
    ORG_NAME=$3
    MSP_NAME=$4
    PEER_PORT=$5
    shift;shift;shift;shift;shift;
    export PATH=$PWD/bin:$PATH
    export FABRIC_CFG_PATH=$PWD/config
    export CORE_PEER_MSPCONFIGPATH=$PWD/.build/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/users/Admin@$ORG_NAME.aomd.com/msp
    queryString="$queryString --peerAddresses localhost:$PEER_PORT --tlsRootCertFiles ${PWD}/.build/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/peers/$PEER_NAME.$ORG_NAME.aomd.com/tls/ca.crt"

    # CC 배포를 위해 패키지화
    infoln " CC 배포를 위해 패키지화합니다."
    peer lifecycle chaincode package $CC_NAME.tar.gz --path chaincode/$TARGET_NAME/build/install --lang java --label ${CC_NAME}_${CC_VERSION}
    deployCCPeer $CHANNEL_NAME $ORG_GROUP_NAME $CC_NAME $CC_VERSION $PEER_NAME $ORG_NAME $MSP_NAME $PEER_PORT
    organizationCount=$(( organizationCount - 1))

    while [ $organizationCount -gt 0 ]; do
        ORG_GROUP_NAME=$1
        PEER_NAME=$2
        ORG_NAME=$3
        MSP_NAME=$4
        PEER_PORT=$5
        shift;shift;shift;shift;shift;
        queryString="$queryString --peerAddresses localhost:$PEER_PORT --tlsRootCertFiles ${PWD}/.build/organizations/$ORG_GROUP_NAME/$ORG_NAME.aomd.com/peers/$PEER_NAME.$ORG_NAME.aomd.com/tls/ca.crt"

        deployCCPeer $CHANNEL_NAME $ORG_GROUP_NAME $CC_NAME $CC_VERSION $PEER_NAME $ORG_NAME $MSP_NAME $PEER_PORT

        organizationCount=$(( organizationCount - 1))
    done

    # 패키지 commit
    infoln "CC 패키지를 commit 합니다."
    peer lifecycle chaincode commit -o localhost:9050 --ordererTLSHostnameOverride orderer.aomd.com --channelID $CHANNEL_NAME --name $CC_NAME --version $CC_VERSION --sequence 1 --tls --cafile "${PWD}/.build/organizations/ordererOrganizations/orderer.aomd.com/orderers/orderer.aomd.com/msp/tlscacerts/tlsca.aomd.com-cert.pem" $queryString

    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name $CC_NAME

    peer chaincode invoke -o localhost:9050 --ordererTLSHostnameOverride orderer.aomd.com --tls --cafile "${PWD}/.build/organizations/ordererOrganizations/orderer.aomd.com/orderers/orderer.aomd.com/msp/tlscacerts/tlsca.aomd.com-cert.pem" -C $CHANNEL_NAME -n $CC_NAME $queryString -c '{"function":"init","Args":[]}'
}

# write cc 배포
deployCCOrgnizationAndInvoke educationchannel educationCC 1.0 education educationOrganizations peer0 educationOrg1 EducationOrg1MSP 6051 educationOrganizations peer0 educationOrg2 EducationOrg2MSP 6052 educationOrganizations peer0 educationOrg3 EducationOrg3MSP 6053 readOrganizations peer0 readOrg ReadOrgMSP 5051
deployCCOrgnizationAndInvoke awardchannel awardCC 1.0 award awardOrganizations peer0 awardOrg1 AwardOrg1MSP 7051 awardOrganizations peer0 awardOrg2 AwardOrg2MSP 7052 awardOrganizations peer0 awardOrg3 AwardOrg3MSP 7053 readOrganizations peer0 readOrg ReadOrgMSP 5051
deployCCOrgnizationAndInvoke licensechannel licenseCC 1.0 license licenseOrganizations peer0 licenseOrg1 LicenseOrg1MSP 8051 licenseOrganizations peer0 licenseOrg2 LicenseOrg2MSP 8052 licenseOrganizations peer0 licenseOrg3 LicenseOrg3MSP 8053 readOrganizations peer0 readOrg ReadOrgMSP 5051

# read cc 배포
deployCCOrgnization educationchannel readCC 1.0 read educationOrganizations peer0 educationOrg1 EducationOrg1MSP 6051 educationOrganizations peer0 educationOrg2 EducationOrg2MSP 6052 educationOrganizations peer0 educationOrg3 EducationOrg3MSP 6053 readOrganizations peer0 readOrg ReadOrgMSP 5051
deployCCOrgnization awardchannel readCC 1.0 read awardOrganizations peer0 awardOrg1 AwardOrg1MSP 7051 awardOrganizations peer0 awardOrg2 AwardOrg2MSP 7052 awardOrganizations peer0 awardOrg3 AwardOrg3MSP 7053 readOrganizations peer0 readOrg ReadOrgMSP 5051
deployCCOrgnization licensechannel readCC 1.0 read licenseOrganizations peer0 licenseOrg1 LicenseOrg1MSP 8051 licenseOrganizations peer0 licenseOrg2 LicenseOrg2MSP 8052 licenseOrganizations peer0 licenseOrg3 LicenseOrg3MSP 8053 readOrganizations peer0 readOrg ReadOrgMSP 5051