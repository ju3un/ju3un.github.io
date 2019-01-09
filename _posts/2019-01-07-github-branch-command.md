---
title: Github Branch 생성/ 전환/ 삭제 등 명령어
date: 2019-01-07
tags:
  - github
  - branch
keywords:
  - github
  - branch
  - branch 생성
  - branch 삭제
  - branch 전환
attachments:
---

##1. Branch(브랜치) 생성

>현재 원격 저장소 연결된 경로로 이동하고 생성하고자 하는 [BRANCH-NAME]으로 생성한다.

```shell
$ cd [DIRECTORY]
$ git branch [BRANCH-NAME]
```

###1-1. Branch(브랜치) 전체 목록 확인

```shell
$ git branch
```
> 앞 부분에 *가 붙어있는 것이 현재 선택된 브랜치이다.

##2. Branch(브랜치) 전환

> 전환하고자 하는 [BRANCH-NAME]으로 이동한다.

```shell
$ git checkout [BRANCH-NAME]
```

> 이 후 브랜치에 파일 커밋(Commit)에 포함 시키기, 커밋 작업은 전부 동일하다.

```shell
$ git add .
$ git commit -m "[MESSAGE]"
```

##3. Branch(브랜치) 푸쉬(Push)하기 

```shell
$ git push origin [BRANCH-NAME]
```

##4. Branch(브랜치) 삭제

> 만약 현재 브랜치를 삭제하고 싶다면 아래와 같이 입력하면 된다.

```shell
$ git push origin --delete [BRANCH-NAME]
```
