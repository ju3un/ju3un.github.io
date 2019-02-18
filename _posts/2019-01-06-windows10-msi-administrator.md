---
title: Windows 10에서 msi파일 관리자 권한으로 실행하기
date: 2019-01-06
tags:
  - windows 10
  - msi
  - administrator
keywords:
  - windows 10
  - msi 관리자
  - administrator
attachments:
---

##Windows 10 - .msi파일 관리자로 실행하기

>일부 프로그램 설치 시 반드시 '관리자 권한'으로 설치해야 하는 경우가 있다.
그런데 Windows10의 경우 '관리자 권한으로 실행'메뉴가 누락되어 있다.

이 때 설치 방법에 대해서 말해보고자 한다.

###방법은 두 가지가 있다.
 - .msi파일에 '관리자 권한으로 실행' 메뉴를 사용할 수 있도록 추가한다.
 - '관리자 권한으로 실행'으로 cmd를 실행 후 직접 명령어를 사용하여 설치한다.

>얼핏 보기에 1번이 한번 설정해놓으면 되니까 편해보일 수 있지만<br>
1번 방법으로 실행해도 중간에 오류가 나는 경우가 종종 있기 때문에 2번 방법을 추천한다.

---

## 1. msi파일에 '관리자 권한으로 실행' 메뉴를 사용할 수 있도록 추가하는 법
  >1. 레지스트리 편집기를 실행한다.
  >2. HKEY_CLASSES_ROOT\Msi.Package\shell 키로 이동한다.
  >3. shell 하위 키로 'runas'를 새로 생성한다.
  >4. runas키에 'HasLUAShield' 새 문자열 값을 생성한다.
  >5. runas키에 'command'라는 새 하위 키를 생성한다.
  >6. 'command' 키의 기본 값을 더블 클릭한 후 데이터에 다음 명령을 입력한다.
     C:\Windows\System32\msiexec.exe/i \%1\" %*
  >7. 이제 msi파일의 '관리자 권한으로 실행' 메뉴가 추가된 것을 확인할 수 있다.


## 2. '관리자 권한으로 실행'으로 cmd를 실행 후 직접 명령어를 사용하여 설치하는 법
 >1. cmd를 오른쪽 마우스 클릭 후 '관리자 권한으로 실행'으로 실행한다.
![](https://user-images.githubusercontent.com/41428527/50735963-c91a8c80-11f9-11e9-9637-8bbe94600120.png)
 >2. msi설치 파일 경로에 접근한다.
      cd C:\User\ju3un\Downloads\Toad
 >3. msi파일명을 입력하면 (확장자 포함) 설치 마법사가 시작되는 것을 볼 수 있다.
      ToadforDB2_6.5.0.125.x86.msi