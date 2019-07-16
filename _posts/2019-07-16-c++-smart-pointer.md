---
title: C++ 스마트 포인터(Smart Pointer)
date: 2019-07-16
tags:
  - c++
  - c++14
  - smart pointer
  - unique_ptr
  - shared_ptr
  - weak_ptr
keywords:
  - c++
  - c++14
  - smart pointer
  - unique_ptr
  - shared_ptr
  - weak_ptr
---

c++ 언어에서는 new 연산자를 사용하여 동적으로 메모리를 할당하면,<br>
반드시 delete 연산자를 사용하여 메모리를 해제해야 한다.<br>
<br>
자바(Java)에서는 가비지 컬렉터(Garbage Collector)라는 자동으로 더 이상 사용되지 않는 메모리를 주기적으로 정리해주는 개념이 있지만, c++에서는 직접 메모리를 관리해야 한다는 점에서 좀 더 신경을 쓸 수 밖에 없다.<br>
<br>
이에, C++에서 메모리 누수(Memory Leak)로부터 프로그램의 안전성을 보장하는 **스마트 포인터(Smart Pointer)**를 도입하였고, 오랜만에 스마트 포인터에 관해 정리해보려고 한다.

---

## 1. 스마트 포인터(Smart Pointer)

### 1-1. RALL(Resource Acquisition Is Initialization) 원칙

> - 안전하게 자원을 사용하기 위한, C++에서 자주 쓰는 패턴
> - 객체가 사용되는 스코프(범위)를 벗어나면, 자원을 해제해주는 기법
> - ex. 함수 내의 지역변수(stack에 할당된 메모리)는 그 함수가 끝나는 시점에서 메모리가 해제되는 원리


### 1-2. 자원 관리 객체

> - 자원을 획득한 후 자원 관리 객체, 즉 스마트 포인터(Smart Pointer)에 넘겨준다.
> - 자원 관리 객체는 자신의 소멸자(스마트 포인터의 소멸자에 존재하는 delete 연산자)를 이용해서 자원을 해제한다.
> - **포인터처럼 동작하는 클래스 템플릿**으로, 사용이 끝난 메모리를 자동으로 해제해 준다.
> - 기존 포인터 타입에서 자원 관리 기능(메모리 자원 관리, 경계 검사 등)이 추가된 추상 데이터 타입
> - 원본 삭제 및 참조 카운트(Reference Count)를 이용해 댕글링 포인터(Dangling Pointer)가 되는 것을 막는다.<br>

(cf. Dangling Pointer : 해제된 동적 메모리 영역을 가리키고 있는 포인터 / stack에서 사라진 메모리를 가리키는 포인터)

---
## 2. 스마트 포인터 종류

STL 라이브러리에 공식 지원하는 스마트 포인터는 아래와 같이, 3가지가 있다.<br>
auto_ptr은 C++11에서 표준에서 제외되었다.

- unique_ptr
- shared_ptr
- weak_ptr

---
### 2-1. unique_ptr

>- auto_ptr의 하위 호환<br>
>- 복사X, 이동만 가능(복사 생성자, 복사 대입 연산자 구현되어 있지 않음)
>- 소유권 독점 방식 사용(소유권 이전 시 std::move() 사용)
>- 해당 객체의 소유권을 가지고 있을 때만, 소멸자가 해당 객체를 삭제할 수 있음
>- C++14 이후 make_unique() 함수를 사용하여 unique_ptr 객체를 안전하게 생성할 수 있음

### 2-2. shared_ptr

>- 참조 카운팅 방식 스마트 포인터(Reference Counting Smart Pointer)
>- 소유권이 아닌 공유 방식 사용
>- 참조 카운트가 0이 될 때만, 해당 객체가 자동으로 삭제됨

### 2-3. weak_ptr

>- shared_ptr와 함께 사용할 수 있는 스마트 포인터
>- shared_ptr의 문제점(상호 참조로 인해 객체가 삭제되지 않는 상황)을 보완하기 위해 사용되는 특수 포인터
>- shared_ptr을 weak_ptr로 참조 시, 참조 카운트에 포함되지 않음
>- 포인터에 대한 직접적인 접근이 불가능함

---
### 번외,

오늘은 일단 간략하게 스마트 포인터에 대해 정리했다.<br>
위에서 언급한 3가지 종류의 스마트 포인터에도 문제점이 존재하고, 사용법도 각기 다르다.<br>
3가지 종류의 장단점과 사용 예제도 같이 업데이트 할 예정이다.<br>

---

###References

- [C++11 스마트 포인터](https://blog.koriel.kr/cpp11-smart-pointer/)
- [[C++] 스마트포인터(Smart Pointer)](https://hmjo.tistory.com/202)

