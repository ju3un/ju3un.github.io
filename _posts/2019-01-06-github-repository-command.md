---
title: Github Repository 생성/ 원격 저장소 연결/ 커밋 등 명령어
date: 2019-01-06
tags:
  - github
  - repository
keywords:
  - github
  - repository
  - github 커밋
  - github Repository 생성
---

##1. Repository(저장소) 생성

먼저 Github 사이트에서 Repository를 생성한다.

 ![](https://user-images.githubusercontent.com/41428527/50735685-198feb00-11f6-11e9-8bde-fee4fe1b2477.png)


##2. Repository 원격 저장소 연결

>터미널 실행 후 자신의 프로젝트 디렉터리 위치로 이동한다.

```shell
$ cd [DIRECTORY]
```

>새로운 git 저장소를 초기화 한다.

```shell
$ git init
```

> 현재 로컬 경로를 원격 저장소로 연결한다.

```shell
$ git remote add origin [REPOSITORY 주소]
```

###2-1. 현재 로컬 경로의 원격 저장소 주소 확인 

```shell
$ git remote -v
```

###2-2. 현재 로컬 경로의 원격 저장소 연결 재설정 

```shell
$ git remote set-url origin [재설정할 REPOSITORY 주소]
```

###2-3. 현재 로컬 경로의 원격 저장소 연결 삭제

```shell
$ git remote remove origin
```

##3. 현재 로컬 경로의 파일 상태 확인 

```shell
$ git status
```

Untracked files: 목록의 초록색 파일명은 commit에 포함되는 파일이다.

반대로 빨간색 파일명은 commit에 포함되지 않은 파일이다. 

##4. 파일 커밋(Commit)에 포함 시키기

```shell
$ git add .
$ git add example.txt
```

위의 명령어처럼 전체 파일을 포함시키거나 특정 파일만 포함시킬 수 있다.

##5. 커밋(Commit)하기

```shell
$ git commit -m "[MESSAGE]"
```

-m은 메세지를 적겠다는 옵션을 나타낸다.

##6. 푸쉬(Push)하기 

```shell
$ git push origin master
```

최종적으로 Commit 해두었던 파일들을 원격 저장소에 올리기 위함이다.

여기서 origin은 현재 base branch인 곳을 가르키는 걸로 알고 있다.

master은 master branch를 일컫는데 만약 다른 branch에 올리고 싶다면 master을 branch명으로 변경해주면 된다.

branch 관련 명령어는 따로 포스팅 올릴 예정이다.



