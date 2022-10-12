#!/bin/bash

export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

. config/scripts/utils.sh
. createOrganizations.sh
. createChannels.sh

function deleteDocker() {
    infoln "remove build folder"
    sudo rm -rf .build
    infoln "stop docker containers"
    # | grep -v $(docker ps -q --filter='name=aomd_server' --filter='name=mysql')
    docker stop $(docker ps -aq)
    infoln "remove docker containers"
    # | grep -v $(docker ps -q --filter='name=aomd_server' --filter='name=mysql')
    docker rm $(docker ps -aq)
    infoln "remove docker volumes"
    docker volume prune -f
}

function createOrgs() {
    infoln "Generating certificates using Fabric CA"

    IMAGE_TAG=${CA_IMAGETAG} docker-compose -f $COMPOSE_FILE_CA up -d 2>&1

    . createOrganizations.sh


  while :
    do
      if [ ! -f ".build/organizations/fabric-ca/ca-educationOrg1/tls-cert.pem" ]; then
        sleep 1
      else
        break
      fi
    done

    infoln "Create education Organiation Identities"

    sudo chown -R thuthi:thuthi .build
    sudo chmod -R 755 .build

    createOrganizations
}

function createConsortium() {
  infoln "Generating Orderer Genesis block"

  set -x
  configtxgen -profile AOMD -channelID system-channel -outputBlock .build/system-genesis-block/genesis.block
  res=$?
  { set +x; } 2>/dev/null
  if [ $res -ne 0 ]; then
    fatalln "Failed to generate orderer genesis block..."
  fi
}

CA_IMAGETAG="latest"
COMPOSE_FILE_CA=config/docker/docker-compose-ca.yaml

if [ $# != 1 ]; then
    errorln "스크립트 매개변수가 1개 이어야 합니다."
    exit 0
fi

if [ $1 == "down" ]; then
    deleteDocker
elif [ $1 == "up" ]; then
    createOrgs
    createConsortium
    docker-compose -f config/docker/docker-compose-initial.yaml up -d 2>&1
    createChannels
elif [ $1 == "re" ]; then
    deleteDocker
    createOrgs
    createConsortium
    docker-compose -f config/docker/docker-compose-initial.yaml up -d 2>&1
    createChannels
elif [ $1 == "test" ]; then
    ./createChannels.sh
fi
