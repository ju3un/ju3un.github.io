---
title: C++ 전방 선언 (Forward Declaration)
date: 2019-02-07
tags:
  - c++
  - class
  - forward declaration
  - 전방 선언
keywords:
  - c++
  - class
  - forward declaration
  - 전방 선언
---

## 전방 선언 (Forward Declaration)

**식별자를 정의하기 전에 식별자의 존재를 컴파일러에게 미리 알리는 방식이다.**

예를 들어보자.

>class A.h / class A.cpp<br>
class B.h / class B.cpp<br>
위와 같이 구성된 파일이 있다고 가정할 때, class B 작성 시 class A를 사용할 일이 있다면, <br>
우리는 가장 일반적으로 class B.h 파일에 **#include class A.h** 를 추가하는 방법을 쉽게 떠올릴 수 있다.

그러나 이러한 방식은 컴파일 시간을 증가시키는 요인이 된다.<br>
C++에서는 하나의 헤더 파일이 변경되어도 include한 파일들이 모두 재컴파일되기 때문이다.

따라서 **전방 선언은 헤더 포함 의존성을 최소화하기 위해 도입된 방식이다.**

---

##1. 전방 선언 (Forward Declaration) 예제

전방 선언은 클래스 정의 시에 멤버 변수나 함수를 떠올리면 쉽게 와닿을 것이다.<br>
예를 들어보자.

```cpp
// Mother.h

class Mother
{
  // ..
}
```

```cpp
// Family.h

// Forward Declaration
class Mother;
class Family
{
public:
  Family() = default;
  Family(Mother* p_pMother);
  Family(Mother& p_pMother);
  ~Family();
   
private:
  Mother* m_pMainFamily = nullptr;
}
```

이와 같이 헤더 파일에서 Family 클래스 작성 시 Mother 클래스 명만 사용하는 경우를 종종 볼 수 있다.<br>

이처럼 특정 클래스 이름만 필요로 할 경우에는 전방 선언만으로도<br>
>1. 헤더 포함 의존성을 회피할 수 있고<br>
>2. 해당 헤더의 불필요한 정보들이 노출되지 않는다.

**단, 반드시 주의해야 하는 것은 전방 선언을 사용할 경우, 그 클래스 관련 객체는 포인터형으로 선언해야 한다.**<br>
만약, 포인터형이 아닌 객체를 생성할 경우, **해당 객체 할당 크기를 정확히 파악할 수 없기 때문이다.**<br>
(포인터형으로 선언시에는 4바이트(in 32bit OS)를 할당할 수 있다.)

---

###cf. 매개 변수 / 리턴 타입을 위한 전방 선언 (Forward Declaration)

단, 메서드(함수)의 매개변수나 리턴 타입으로 이름만 사용될 경우에는 포인터형이 아닌 객체를 사용할 수 있다.<br>

```cpp
// Family.h

// Forward Declaration
class Mother;
class Family
{
public:
  Mother GetMainFamily();
  void SetMainFamily(Mother p_Mother);
}
```
<br>

**함수 Body와 그 함수를 호출하는 코드에서만 클래스의 크기를 요구하기 때문에 이런 경우에는 포인터 형이 아니어도 된다.**

---

###References

- [[C++] 전방 선언 (Foward Declaration)](http://egloos.zum.com/sweeper/v/2827565)