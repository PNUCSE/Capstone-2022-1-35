### 1. 프로젝트 소개

부산대학교 2022년 전기 졸업과제 JO2SEO팀  
블록체인을 활용한 포트폴리오 관리 플랫폼 개발

### 2. 팀소개

[조병우](https://github.com/whquddn55), whquddn55@gmail.com,   블록체인(HyperledgerFabric) 개발

[조현우](https://github.com/hyun98), hyun0404woo@gmail.com, 백엔드(SpringBoot, CI/CD) 개발

[서지원](https://github.com/jwseo4074), zwon2056@gmail.com, 프론트(React) 개발

### 3. 시스템 구성도

![image](https://user-images.githubusercontent.com/26822105/195231874-6b4dc5d1-e2a9-4342-b147-0f26f62bf314.png)

### 4. 소개 및 시연 영상

- 10/26까지 학과 계정으로 링크 나오면 업로드

### 5. 설치 및 사용법

#### 프론트(리액트)
- 호호호

#### 백엔드(SpringBoot, CICD)
- 하하하

#### 블록체인(HyperledgerFabric)

프로젝트 실행전 HyperledgerFabric 개발환경 세팅을 완료해야합니다.
환경설정을 위한 버전 정보는 아래와 같습니다.
|Name|Version|
|----|-------:|
|OS|Ubuntu 20.04.5 LTS|
|Kernel| 5.17.4-051704|
|Go|1.18.1|
|Java|11.0.15|
|HLF|2.2.7|
|HLF-ca|1.5.3|
|Docker|20.10.18|
|jq|1.6|

아래 명령어를 통해 해당 프로젝트를 로컬에 내려받습니다.
``` shell
$ git clone https://github.com/whquddn55/Capstone-2022-2-35.git
```

아래 명령어를 통해 블록체인 네트워크의 노드들을 설치합니다.
``` shell
$ cd ./Capstone-2022-2-35
$ ./buildNetwork.sh up
```

아래 명령어를 통해 체인코드를 컴파일하고 설치된 노드들에 체인코드를 발급합니다.
``` shell
$ ./deployCC.sh
```

오류 또는 에러가 발생하는 경우 아래 명령어를 통해 네트워크를 다시 설치해야할 수 있습니다.
``` shell
$ ./buildNetwork.sh re
```

네트워크 세부 설정을 위해 네트워크를 중지해야할 때에는 아래 명령어를 통해 네트워크를 중지시킬 수 있습니다.

``` shell
$ ./buildNetwork.sh down
```