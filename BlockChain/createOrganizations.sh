#!/bin/bash
function createOrganization() {
    infoln "Enrolling the CA admin"
    #Varaibles
    CA_NAME=$1
    ORG_GROUP_NAME=$2
    ORG_NAME=$3
    PORT=$4
    BUILD_FOLDER=${PWD}/.build/organizations
    export FABRIC_CA_CLIENT_HOME=${BUILD_FOLDER}/${ORG_GROUP_NAME}/${ORG_NAME}
    CERT_FILE=${BUILD_FOLDER}/fabric-ca/${CA_NAME}/tls-cert.pem

    mkdir -p ${FABRIC_CA_CLIENT_HOME}

    set -x
    fabric-ca-client enroll -u https://admin:adminpw@localhost:$PORT --caname ${CA_NAME} --tls.certfiles ${CERT_FILE}
    { set +x; } 2>/dev/null

    echo "NodeOUs:
        Enable: true
        ClientOUIdentifier:
            Certificate: cacerts/localhost-$PORT-$CA_NAME.pem
            OrganizationalUnitIdentifier: client
        PeerOUIdentifier:
            Certificate: cacerts/localhost-$PORT-$CA_NAME.pem
            OrganizationalUnitIdentifier: peer
        AdminOUIdentifier:
            Certificate: cacerts/localhost-$PORT-$CA_NAME.pem
            OrganizationalUnitIdentifier: admin
        OrdererOUIdentifier:
            Certificate: cacerts/localhost-$PORT-$CA_NAME.pem
            OrganizationalUnitIdentifier: orderer" > ${FABRIC_CA_CLIENT_HOME}/msp/config.yaml

    #! V2.3대응
    # mkdir -p ${FABRIC_CA_CLIENT_HOME}/msp/tlscacerts
    # cp $CERT_FILE ${FABRIC_CA_CLIENT_HOME}/msp/tlscacerts/ca.crt

    # mkdir -p ${FABRIC_CA_CLIENT_HOME}/tlsca
    # cp $CERT_FILE ${FABRIC_CA_CLIENT_HOME}/tlsca/tlsca.${ORG_NAME}-cert.pem

    # mkdir -p ${FABRIC_CA_CLIENT_HOME}/ca
    # cp $CERT_FILE ${FABRIC_CA_CLIENT_HOME}/ca/ca.${ORG_NAME}-cert.pem

    #Peer0 
    PEER0=peer0.${ORG_NAME}
    infoln "Register peer0 on $ORG_NAME"
    set -x
    fabric-ca-client register -u https://localhost:$PORT --caname ${CA_NAME} --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles ${CERT_FILE}
    { set +x; } 2>/dev/null

    infoln "Registering user"
    set -x
    fabric-ca-client register -u https://localhost:$PORT --caname ${CA_NAME} --id.name user1 --id.secret user1pw --id.type client --tls.certfiles ${CERT_FILE}
    { set +x; } 2>/dev/null

    infoln "Registering the org admin"
    set -x
    fabric-ca-client register -u https://localhost:$PORT --caname ${CA_NAME} --id.name org1admin --id.secret org1adminpw --id.type admin --tls.certfiles ${CERT_FILE}
    { set +x; } 2>/dev/null

    infoln "Generating the peer0 msp"
    set -x
    fabric-ca-client enroll -u https://peer0:peer0pw@localhost:$PORT --caname ${CA_NAME} -M ${FABRIC_CA_CLIENT_HOME}/peers/${PEER0}/msp --csr.hosts ${PEER0} --tls.certfiles ${CERT_FILE}
    { set +x; } 2>/dev/null

    cp ${FABRIC_CA_CLIENT_HOME}/msp/config.yaml ${FABRIC_CA_CLIENT_HOME}/peers/${PEER0}/msp/config.yaml

    infoln "Generating the peer0-tls certificates"
    set -x
    fabric-ca-client enroll -u https://peer0:peer0pw@localhost:$PORT --caname ${CA_NAME} -M ${FABRIC_CA_CLIENT_HOME}/peers/${PEER0}/tls --enrollment.profile tls --csr.hosts ${PEER0} --csr.hosts localhost --tls.certfiles ${CERT_FILE}
    { set +x; } 2>/dev/null

    cp ${FABRIC_CA_CLIENT_HOME}/peers/${PEER0}/tls/tlscacerts/* ${FABRIC_CA_CLIENT_HOME}/peers/${PEER0}/tls/ca.crt
    cp ${FABRIC_CA_CLIENT_HOME}/peers/${PEER0}/tls/signcerts/* ${FABRIC_CA_CLIENT_HOME}/peers/${PEER0}/tls/server.crt
    cp ${FABRIC_CA_CLIENT_HOME}/peers/${PEER0}/tls/keystore/* ${FABRIC_CA_CLIENT_HOME}/peers/${PEER0}/tls/server.key

    #! V2.3
    mkdir -p ${FABRIC_CA_CLIENT_HOME}/msp/tlscacerts
    cp ${FABRIC_CA_CLIENT_HOME}/peers/${PEER0}/tls/tlscacerts/* ${FABRIC_CA_CLIENT_HOME}/msp/tlscacerts/ca.crt

    mkdir -p ${FABRIC_CA_CLIENT_HOME}/tlsca
    cp ${FABRIC_CA_CLIENT_HOME}/peers/${PEER0}/tls/tlscacerts/* ${FABRIC_CA_CLIENT_HOME}/tlsca/tlsca.${ORG_NAME}-cert.pem

    mkdir -p ${FABRIC_CA_CLIENT_HOME}/ca
    cp ${FABRIC_CA_CLIENT_HOME}/peers/${PEER0}/msp/cacerts/* ${FABRIC_CA_CLIENT_HOME}/ca/ca.${ORG_NAME}-cert.pem

    infoln "Generating the user msp"
    set -x
    fabric-ca-client enroll -u https://user1:user1pw@localhost:$PORT --caname ${CA_NAME} -M ${FABRIC_CA_CLIENT_HOME}/users/User1@${ORG_NAME}/msp --tls.certfiles ${CERT_FILE}
    { set +x; } 2>/dev/null

    cp ${FABRIC_CA_CLIENT_HOME}/msp/config.yaml ${FABRIC_CA_CLIENT_HOME}/users/User1@${ORG_NAME}/msp/config.yaml

    infoln "Generating the org admin msp"
    set -x
    fabric-ca-client enroll -u https://org1admin:org1adminpw@localhost:$PORT --caname ${CA_NAME} -M ${FABRIC_CA_CLIENT_HOME}/users/Admin@${ORG_NAME}/msp --tls.certfiles ${CERT_FILE}
    { set +x; } 2>/dev/null

    cp ${FABRIC_CA_CLIENT_HOME}/msp/config.yaml ${FABRIC_CA_CLIENT_HOME}/users/Admin@${ORG_NAME}/msp/config.yaml
}

function createOrderer() {
    infoln "Enrolling the CA admin"
    CA_NAME=$1
    ORG_GROUP_NAME=$2
    ORG_NAME=$3
    PORT=$4
    BUILD_FOLDER=${PWD}/.build/organizations
    export FABRIC_CA_CLIENT_HOME=${BUILD_FOLDER}/${ORG_GROUP_NAME}/${ORG_NAME}
    CERT_FILE=${BUILD_FOLDER}/fabric-ca/${CA_NAME}/tls-cert.pem
    HOST=orderer.aomd.com

    mkdir -p $FABRIC_CA_CLIENT_HOME

    set -x
    fabric-ca-client enroll -u https://admin:adminpw@localhost:$PORT --caname $CA_NAME --tls.certfiles $CERT_FILE
    { set +x; } 2>/dev/null

    echo "NodeOUs:
        Enable: true
        ClientOUIdentifier:
            Certificate: cacerts/localhost-$PORT-$CA_NAME.pem
            OrganizationalUnitIdentifier: client
        PeerOUIdentifier:
            Certificate: cacerts/localhost-$PORT-$CA_NAME.pem
            OrganizationalUnitIdentifier: peer
        AdminOUIdentifier:
            Certificate: cacerts/localhost-$PORT-$CA_NAME.pem
            OrganizationalUnitIdentifier: admin
        OrdererOUIdentifier:
            Certificate: cacerts/localhost-$PORT-$CA_NAME.pem
            OrganizationalUnitIdentifier: orderer" > $FABRIC_CA_CLIENT_HOME/msp/config.yaml

    #! V2.3 대응
    # mkdir -p $FABRIC_CA_CLIENT_HOME/msp/tlscacerts
    # cp $CERT_FILE $FABRIC_CA_CLIENT_HOME/msp/tlscacerts/tlsca.aomd.com-cert.pem

    # mkdir -p $FABRIC_CA_CLIENT_HOME/tlsca
    # cp $CERT_FILE $FABRIC_CA_CLIENT_HOME/tlsca/tlsca.aomd.com-cert.pem

    infoln "Registering orderer"
    set -x
    fabric-ca-client register -u https://localhost:$PORT --caname $CA_NAME --id.name orderer --id.secret ordererpw --id.type orderer --tls.certfiles $CERT_FILE
    { set +x; } 2>/dev/null

    infoln "Registering the orderer admin"
    set -x
    fabric-ca-client register -u https://localhost:$PORT --caname $CA_NAME --id.name ordererAdmin --id.secret ordererAdminpw --id.type admin --tls.certfiles $CERT_FILE
    { set +x; } 2>/dev/null

    infoln "Generating the orderer msp"
    set -x
    fabric-ca-client enroll -u https://orderer:ordererpw@localhost:$PORT --caname $CA_NAME -M $FABRIC_CA_CLIENT_HOME/orderers/$HOST/msp --csr.hosts $HOST --csr.hosts localhost --tls.certfiles $CERT_FILE
    { set +x; } 2>/dev/null

    cp $FABRIC_CA_CLIENT_HOME/msp/config.yaml $FABRIC_CA_CLIENT_HOME/orderers/$HOST/msp/config.yaml

    infoln "Generating the orderer-tls certificates"
    set -x
    fabric-ca-client enroll -u https://orderer:ordererpw@localhost:$PORT --caname $CA_NAME -M $FABRIC_CA_CLIENT_HOME/orderers/$HOST/tls --enrollment.profile tls --csr.hosts $HOST --csr.hosts localhost --tls.certfiles $CERT_FILE
    { set +x; } 2>/dev/null

    cp $FABRIC_CA_CLIENT_HOME/orderers/$HOST/tls/tlscacerts/* $FABRIC_CA_CLIENT_HOME/orderers/$HOST/tls/ca.crt
    cp $FABRIC_CA_CLIENT_HOME/orderers/$HOST/tls/signcerts/* $FABRIC_CA_CLIENT_HOME/orderers/$HOST/tls/server.crt
    cp $FABRIC_CA_CLIENT_HOME/orderers/$HOST/tls/keystore/* $FABRIC_CA_CLIENT_HOME/orderers/$HOST/tls/server.key

    mkdir -p $FABRIC_CA_CLIENT_HOME/orderers/$HOST/msp/tlscacerts
    cp $FABRIC_CA_CLIENT_HOME/orderers/$HOST/tls/tlscacerts/* $FABRIC_CA_CLIENT_HOME/orderers/$HOST/msp/tlscacerts/tlsca.aomd.com-cert.pem

    mkdir -p $FABRIC_CA_CLIENT_HOME/msp/tlscacerts
    cp $FABRIC_CA_CLIENT_HOME/orderers/$HOST/tls/tlscacerts/* $FABRIC_CA_CLIENT_HOME/msp/tlscacerts/tlsca.aomd.com-cert.pem

    infoln "Generating the admin msp"
    set -x
    fabric-ca-client enroll -u https://ordererAdmin:ordererAdminpw@localhost:$PORT --caname $CA_NAME -M $FABRIC_CA_CLIENT_HOME/users/Admin@$ORG_NAME/msp --tls.certfiles $CERT_FILE
    { set +x; } 2>/dev/null

    cp $FABRIC_CA_CLIENT_HOME/msp/config.yaml $FABRIC_CA_CLIENT_HOME/users/Admin@$ORG_NAME/msp/config.yaml
}

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function gen_ccp() {
    local MSPID=$1
    local ORG_GROUP_NAME=$2
    local ORG=$3
    local P0PORT=$4
    local CAPORT=$5
    local PEERPEM=.build/organizations/$ORG_GROUP_NAME/$ORG.aomd.com/tlsca/tlsca.$ORG.aomd.com-cert.pem
    local CAPEM=.build/organizations/$ORG_GROUP_NAME/$ORG.aomd.com/ca/ca.$ORG.aomd.com-cert.pem

    local PP=$(one_line_pem $PEERPEM)
    local CP=$(one_line_pem $CAPEM)
    sed -e "s/\${ORG}/$ORG/" \
        -e "s/\${MSPID}/$MSPID/" \
        -e "s/\${P0PORT}/$P0PORT/" \
        -e "s/\${CAPORT}/$CAPORT/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        config/ccp_template.json > .build/organizations/$ORG_GROUP_NAME/$ORG.aomd.com/connection-$ORG.json

    sed -e "s/\${ORG}/$ORG/" \
        -e "s/\${MSPID}/$MSPID/" \
        -e "s/\${P0PORT}/$P0PORT/" \
        -e "s/\${CAPORT}/$CAPORT/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        config/ccp_template.yaml > .build/organizations/$ORG_GROUP_NAME/$ORG.aomd.com/connection-$ORG.yaml
}

function createOrganizations() {
    createOrganization ca-educationOrg1 educationOrganizations educationOrg1.aomd.com 6055
    createOrganization ca-educationOrg1 educationOrganizations educationOrg2.aomd.com 6055
    createOrganization ca-educationOrg1 educationOrganizations educationOrg3.aomd.com 6055
    createOrganization ca-awardOrg1 awardOrganizations awardOrg1.aomd.com 7055
    createOrganization ca-awardOrg1 awardOrganizations awardOrg2.aomd.com 7055
    createOrganization ca-awardOrg1 awardOrganizations awardOrg3.aomd.com 7055
    createOrganization ca-licenseOrg1 licenseOrganizations licenseOrg1.aomd.com 8055
    createOrganization ca-licenseOrg1 licenseOrganizations licenseOrg2.aomd.com 8055
    createOrganization ca-licenseOrg1 licenseOrganizations licenseOrg3.aomd.com 8055
    createOrganization ca-readOrg readOrganizations readOrg.aomd.com 5055
    createOrderer ca-ordererOrg ordererOrganizations orderer.aomd.com 9055 

    gen_ccp EducationOrg1MSP educationOrganizations educationOrg1 6051 6055
    gen_ccp EducationOrg2MSP educationOrganizations educationOrg2 6052 6055
    gen_ccp EducationOrg3MSP educationOrganizations educationOrg3 6053 6055
    gen_ccp AwardOrg1MSP awardOrganizations awardOrg1 7051 7055
    gen_ccp AwardOr21MSP awardOrganizations awardOrg2 7052 7055
    gen_ccp AwardOr31MSP awardOrganizations awardOrg3 7053 7055
    gen_ccp LicenseOrg1MSP licenseOrganizations licenseOrg1 8051 8055
    gen_ccp LicenseOrg2MSP licenseOrganizations licenseOrg2 8052 8055
    gen_ccp LicenseOrg3MSP licenseOrganizations licenseOrg3 8053 8055
    gen_ccp ReadOrgMSP readOrganizations readOrg 5051 5055
}