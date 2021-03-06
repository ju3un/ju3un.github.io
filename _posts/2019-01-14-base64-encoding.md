---
title: Base64 Encoding
date: 2019-01-14
tags:
  - base64 
  - base64 encoding
keywords:
  - base64 
  - encoding
  - base64 encoding
  - base64 인코딩
---

##1. Base64 Encoding란?

###바이너리(Binary) 데이터를 -> 아스키(Ascii) 문자열로 표현하는 인코딩 방식의 하나이다. 
**쉽게 얘기하자면, Binary 데이터를 Text로 바꾸는 인코딩이라고 생각하면 되겠다.**

>Base64는 글자 그대로 64진법이라는 뜻이다.<br>
그런데 ASCII는 아래 사진과 같이 128개 문자로 이루어져 있다.

![](https://user-images.githubusercontent.com/41428527/51119236-b0435400-1855-11e9-9459-22d83320d8fe.png)

>이 중 제어 문자는 화면에 표시되지 않기 때문에, 실제로 **Text로 나타낼 수 있는 문자는 95개이다.**<br>

>문자 코드(시스템 간 다양한 인/디코딩 방식?)에 영향을 받지 않는,<br>
**공통 ASCII 영역의 문자**만을 표시할 수 있는 **가장 큰 진법**은, (2^7)128진법이 아닌, (2^6)64진법이다.<br>

>**즉, 다시 말해 Base64는 공통 ASCII 영역의 문자만을 사용한다는 의미이다.**

---

##2. Base64 문자
>영문 대문자(A~Z) 26개 + 영문 소문자(a~z) 26개 + 숫자(0~9) 10개 = 62개 값 + 2개(+, /)까지 합친 64개 문자를 갖는다.

![](https://user-images.githubusercontent.com/41428527/51119255-bcc7ac80-1855-11e9-9c2c-c1754c6b58c5.png)

따라서 위와 같은 64개의 문자를 사용한다.

---

##3. Base64 인코딩 원리

일반적으로 컴퓨터 언어에서 기본적인 문자 단위가 1byte(8bit)로 이루어져 있는 반면, **(ex. char - 1byte)**<br>
**Base64에서는 6bit를 사용한다.**<br>
64개의 문자를 사용하기 때문에 2^6인 6bit인 것이다.

그런데 바로 위에 언급한 바와 같이, 가장 일반적인 정보 단위는 8bit씩 엮어진 byte단위이기 때문에<br>
Base64 인코딩에서는 8bit와 6bit의 최소공배수인 **24bit씩** 묶어 처리한다.

**즉, 일반적인 3개(3x8bit)의 문자를 base64에서는 4개(4x6bit)의 문자로 해석한다는 의미가 된다.**

예를 들어보자.
###3-1. Example

![](https://user-images.githubusercontent.com/41428527/51116278-01e7e080-184e-11e9-8b22-c0894ac5d185.png)

###3-2. Example

![](https://user-images.githubusercontent.com/41428527/51117209-758aed00-1850-11e9-8d11-d228813759d4.png)

>이 예제는 설명이 필요하다.<br>
>1. 먼저 rang이라는 4개(4x8bit)의 문자로 이루어져 있고, 이걸 6bit 단위로 자를 때 24bit 묶음을 넘는다.<br>
>2. **따라서 48bit(24bitx2)묶음으로 만들어 준 후 나머지 남은 부분을 0으로 채워 패딩(Padding) 처리를 해주어야 한다.**<br>
>3. **Base64에서는 패딩 문자를 = 문자로 채워준다.**

---

##4. Base64 인코딩 사용 용도, 이유?

분명 복잡하다.<br>
인코딩, 디코딩, 추가 CPU 연산 수행도 필요하고, 6bit당 2bit의 Overhead가 발생하여 데이터의 양도 늘어난다고 한다.<br>

그런데 왜 Base64 인코딩이 필요할까?

**Base64는 ASCII 중 확실하게 화면에 표시할 수 있는 문자만을 다루기 때문에 시스템 간 전달에 안전하다.**

- ASCII는 7bit 인코딩으로 나머지 1bit를 처리하는 방식이 시스템 별로 상이함<br>
- 일부 제어 문자의 경우 시스템 별로 다른 코드 값을 가짐<br>

**따라서 모든 시스템에서 동일한 공통 ASCII로만 이루어진 Base64 인코딩을 사용하는 것이다.**


예를 들어, HTML, Email과 같이 문자로 이루어진 미디어에 Binary 데이터를 될 때<br>
포함된 **Binary 데이터가 시스템 간 동일하도록 보장하기 위해** 사용한다.

---

###References

- [ASCII](https://namu.wiki/w/%EC%95%84%EC%8A%A4%ED%82%A4%20%EC%BD%94%EB%93%9C)
- [Base64](https://en.wikipedia.org/wiki/Base64)
- [Base64](http://ktko.tistory.com/114)