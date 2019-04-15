---
title: C++ 형 변환(Type Casting)
date: 2019-04-15
tags:
  - c++
  - type casting
  - cast operators
keywords:
  - c++
  - type casting
  - cast operators
  - cast
  - casting
  - 형 변환
  - 타입 캐스트
  - static_cast
  - dynamic_cast
  - reinterpret_cast
  - const_cast
---

먼저 가장 기본적으로 형 변환은 **묵시적 형 변환(Implicit Cast), 명시적 형 변환(Explicit Cast)** 두 가지로 구분할 수 있다.<br>

>```cpp
int i = 0;
char ch1 = i;       // 묵시적 형 변환(Implicit Cast)
char ch2 = (char)i; // 명시적 형 변환(Explicit Cast)

이 포스팅에서는 명시적 형 변환 위와 같은 (new\_type) 연산자 이외의<br>
**static\_cast, reinterpret\_cast, const\_cast, dynamic\_cast 연산자**에 대해 정리하려고 한다.

#### 4가지 연산자의 형식은 \***\_cast<new\_type>(expression) 와 같다.

---

## 1. static_cast

 - 가장 보편적으로 사용되는, 논리적으로 변환 가능한 타입을 변환하는 연산자
 - 컴파일(Compile) 시점에 발생
 - 묵시적 형 변환(Implicit Cast)과 같은 맥락

Q. 묵시적 형 변환은 문법적인 키워드가 존재하지 않는데, static_cast이 묵시적 형 변환과 같은 의미라니?
> **컴파일러가 값을 변환하기 위해 기계어 코드를 만들어 내는 컴파일 시점에 형 변환이 일어나는 시점** 에서 같은 맥락

Q. 그렇다면 static_cast(정적 캐스팅)과 묵시적 형 변환과의 차이는?
> **"상속 관계에 있는 포인터끼리 변환이 가능하다"**는 점이다.<br>
> 그러나, 다운캐스트(Downcast)의 경우 Unsafe 하다. **(Unsafe Downcasting)**

#### cf. new_type으로 void* 형이 올 수 있지만 return 값이 없다.

--- 

## 2. reinterpret_cast

 - 임의의 포인터끼리 변환 허용 **(연관성이 없는 포인터 타입의 형 변환 가능)** (static_cast와의 차이점)
 - **강제 형 변환**으로 문법적으로 변환을 허용하는 것이지, 논리적으로 안전한 타입 연산자는 아님
 - expression에 해당하는 것을 new_type으로 비트 단위로 강제 형 변환

ex) 주로 **정수형 -> 포인터** 또는 **포인터 -> 정수형** 변환하는 작업에 주로 사용함

```cpp
int nCount;
int* pCount;
nCount = reinterpret_cast<int>(&pCount);
```

---

## 3. const_cast

- **포인터 타입, 참조형**에 대해서만 사용되며 **동일한 타입에 대해서만 허용함**
- **const 속성**이나 **volatile 속성**을 잠깐 제거할 때 사용

```cpp
int main(void)
{
    char str[] = "Hello World";
    const char* ptr = str;

    char* c = const_cast<char*>(ptr);
    c[0] = 'M';

    return 0;
}
```

> 

---

## 4. dynamic_cast

### RTTI(Runtime Type Information)

C++ 컴파일러 내에 포함되어 있는 기능으로, **객체의 유형을 실행 시에 결정할 수 있도록 허용하는 것**을 의미한다.<br>
다른 말로는 **실행 중에 타입의 정보를 가지고 온다**는 의미로 표현할 수도 있다.<br>

> 메모리 상주 객체에 유형 정보를 추가하여, 실행 시스템은 객체의 캐스트(=형 변환)가 유효한 지 여부를 확실히 하기 위해 특정 객체의 유형을 결정할 수 있다.<br>

####RTTI는 객체를 동적으로 변화시킬 수 있는 **Polymorphism** 능력이라고 이해하면 된다.

타입 캐스팅에서 이 용어를 다룬 이유는, 바로 **dynamic_cast 연산자가 이 요소 중 하나**이기 때문이다.

---

- 주로 **Safe Downcasting**으로 사용되는 연산자 (부모 클래스 포인터에서 -> 자식 클래스 포인터로 다운캐스팅)
- 다른 캐스트와 달리 **런타임 시간에 다운 캐스팅이 가능한지 능동적으로 판단**하기 때문에 런타임 비용이 높음.<br>

#### 형 변환 성공 시 : 변환된 값 return
#### 형 변환 실패 시 : 널 포인터(null pointer) 또는 예외(Exception) return

최근에 나도 코딩하면서 dynamic_cast 연산자의 필요성을 느끼게 되었는데 예제를 통해 확인해보자.

```cpp
class Blog
{
public:
    Blog();
    ~Blog();

protected:
    virtual void Show();
};

class GitPage
    : public Blog
{
public:
    GitPage();
    ~GitPage() override;

    int GetPostCount();

praivate:
    int m_nPostCount = 0;

protected:
    void Speak() override;
};

/// .cpp 파일은 생략해도 예제에는 문제가 없을 것으로 보아 생략한다.

int main(void)
{
    Blog* pBlog = new Blog();

    GitPage* pGitPage = dynamic_cast<GitPage*>(pBlog);

    if(pGitPage == nullptr)
        return -1;
    else
        pGitPage->Show();

    return 0;
}
```

---

###References

- [C++ 타입캐스트 연산자](https://blockdmask.tistory.com/236)
- [C++ type casting 정리](https://javawoo.tistory.com/40)
