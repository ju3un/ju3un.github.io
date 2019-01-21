---
title: 인코딩(Encoding) - ASCII, ANSI, Multi-Byte, Unicode 등 - (1)
date: 2019-01-22
tags:
  - encoding
  - unicode
  - ansi
  - multibyte
  - unicode
keywords:
  - encoding
  - unicode
  - ansi
  - multibyte
  - unicode
  - 유니코드
  - 멀티바이트
---

####이번 포스팅에서는 기본적인 문자 인코딩 방식에 대해 정리하려고 한다.
어쩌면 가장 기본적인 개념이다. C++을 개발하다보면, 문자관련 에러가 발생하면 프로젝트 속성에서 유니코드 또는 멀티바이트를 수정한다.<br>
근데 유니코드와 멀티바이트가 뭔지는 알고 수정하는지 감히 묻고 싶다.

먼저 유니코드, 멀티바이트를 논하기 전에 아스키(ASCII) 코드에 대해 간단하게 정리 해보자.

##1. 아스키(ASCII) 코드

- (American Standart Code for Information Interchage)의 약자
- 컴퓨터는 숫자(0과1)만 인식할 수 있기 때문에, 숫자와 문자를 대응시킨 것
- 영문 알파벳을 사용하는 대표적인 문자 인코딩
- **7bit 인코딩(128개의 문자 표현)** + 1bit(Parity Bit)로 총 8bit로 사용.
- 총 128개 문자[출력 불가능한 제어 문자(33개) + 공백을 비롯한 출력 문자(95개)]

---

##2. ANSI
영어만을 고려하여 만들어진 ASCII에서 다른 언어를 지원해야 할 필요가 생겨 만들어진 인코딩이다.

- (American National Standard Institute)의 약자
- ASCII의 확장판 : 앞의 7bit(ASCII와 동일) + 1bit(**CodePage**) = **총 8bit로 사용**.

####여기서 CodePage란,<br> 
각 언어별로 code값을 주고 code마다 다른 문자열 표를 의미하도록 약속한 것이다.

CodePage로는 CP949, EUC-KR 등 여러 가지가 있는데 이 부분은 따로 포스팅할 예정이다.

---

##3. 멀티바이트(Multi-Byte)

위의 ASCII 문자는 8bit 즉, 1byte로 표현하는 문자이다.<br>
**그런데 ASCII 문자표를 보면 알 수 있듯이, 영어, 숫자, 기타 부호 등 128개 문자만 사용할 수 있는데**<br>
**그렇다면 한글, 일본어는 어떻게 표현해야하는가?**

->1바이트 더 추가해서 총 2바이트로 문자 집합을 구성하여 사용할 수 있게 하였고 이를 ISO-2200에 정의하게 되었다.<br>

**여기서 주의해야 할 것은 2byte를 사용하는 것이 멀티바이트가 아니라, 문자 하나를 표현하는데 있어 다양한 바이트 수를 사용하는 방식이 멀티바이트인 것이다.**

즉, 멀티바이트는 **가변 문자열**이라고 생각하면 된다.

- **영어와 같이 아스키 코드에 포함되는 문자 1byte**
- **그 외 다른 언어처럼 아스키 코드에 포함되지 않는 문자 2byte** 처럼 다르게 할당해주는 방식이다.

그리고 이 멀티바이트 MBCS(Mutli-Byte Character Set)이 ANSI와도 동일 개념이라고 한다.

---

##4. 유니코드(Unicode)

- 모든 문자(영어 포함)를 **항상 2byte**로 표현
- 전 세계의 모든 문자를 2byte 숫자로 1:1 매핑해 놓은 하나의 코드표

UTF(Unicode Transformation Format)는 유니코드 기반으로 적절히 조작해 byte를 문자로 변환하는 인코딩 방식이다.

그러나 보통, Unicode Encoding이라 하면<br> 
Windows, Java에서는 UTF-16을, 나머지 시스템에서는 UTF-8을 가리킨다.

혼용할 수 있으니 조심해야 한다.

---

###번외,

>다음에는 UTF-8, UTF-16과, 위에서 말했던 코드페이지 CP949 등에 대해서 포스팅할 예정이다.<br>

>사실 ANSI와 멀티바이트에 대한 개념이 혼용되는 것 같아 검색을 많이 했는데, 딱 정의내려진 참조를 찾지 못하여<br>
이 부분에 관한 것도 수정될 수 있다는 부분을 미리 말한다.

---

###References

- [문자열 인코딩 개념 정리(ASCII/ANSI/EUC-KR/CP949/UTF-8/UNICODE)](https://onlywis.tistory.com/2)
- [Encoding 정리](https://umbum.tistory.com/328)
