## 부산대학교 2022년 전기 졸업과제 35번 - JO2SEO팀  
블록체인을 활용한 포트폴리오 관리 플랫폼 개발

## 1. 프로젝트 소개


 본 과제는 개인 정보의 유출과 오남용 및 데이터의 위변조와 같은 문제를 해결하기 위해 자기 정보 통제 및 데이터 무결성 측면에서 장점을 가지는 블록체인을 활용한 개인 포트폴리오 관리 플랫폼을 제안한다.   

제안하는 시스템은 블록체인에 사용자 자기 정보를 저장하고 블록체인 네트워크는 프라이빗 네트워크의 구현체인 하이퍼레저 패브릭을 기반으로 동작한다.   

개인 포트폴리오 항목의 해시값을 블록체인에 저장함으로써 공유 데이터의 무결성 검사가 가능하게 한다. 현재 세종 텔레콤, 몰리다 등 여러 학사 정보 및 포트폴리오 관리 플랫폼들이 존재하지만,   

기능 및 성능 측면에서 보완할 점을 다수 발견했다. 이를 개선하고자 새로운 개인 포트폴리오 관리 플랫폼을 제안한다.

## 2. 팀소개

|이름|깃허브|이메일|역할|
|---|---|---|------|
|조병우|https://github.com/whquddn55|whquddn55@gmail.com|블록체인(HyperledgerFabric) 개발|
|조현우|https://github.com/hyun98|hyun0404woo@gmail.com|백엔드(SpringBoot, CI/CD) 개발|
|서지원|https://github.com/jwseo4074|zwon2056@gmail.com|프론트(React) 개발|

## 3. 시스템 구성도

![image](https://user-images.githubusercontent.com/26822105/195231874-6b4dc5d1-e2a9-4342-b147-0f26f62bf314.png)

## 4. 소개 및 시연 영상

- 10/26까지 학과 계정으로 링크 나오면 업로드

## 5. 설치 및 사용법

### 프론트(리액트)
플랫폼의 프론트엔드 사이드는 프레임워크인 React를 기반으로 설계되었습니다.

#### 1. Clone Project
``` shell
$ git clone https://github.com/whquddn55/Capstone-2022-2-35.git
$ cd ./Capstone-2022-2-35/FrontEnd
```

#### 2. Install dependencies in package.json
``` shell
$ npm install
```

#### 3. Run Project
``` shell
$ npm run start
```

### 백엔드(SpringBoot, CICD)
- 하하하

### 블록체인(HyperledgerFabric)

#### 0. Dependencies
|Name|Version|
|----|-------:|
|OS|Ubuntu 20.04.5 LTS|
|Kernel| 5.17.4-051704|
|Go|1.18.1|
|Java|OpenJDK 11.0.15|
|HLF|2.2.7|
|HLF-ca|1.5.3|
|Docker|20.10.18|
|jq|1.6|

#### 1. Clone project
``` shell
$ git clone https://github.com/whquddn55/Capstone-2022-2-35.git
$ cd ./Capstone-2022-2-35/BlockChain
```
#### 2. Set up blockchain network's nodes
``` shell
$ ./buildNetwork.sh up
```
#### 3. Compile chaincode and publish chiancodes to installed nodes
``` shell
$ ./deployCC.sh
```

#### 4. Stop network
``` shell
$ ./buildNetwork.sh down
```
#### 5. Stop network and Set up network in sequence
``` shell
$ ./buildNetwork.sh re
```
