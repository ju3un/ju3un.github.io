---
title: C++ 연산자 오버로딩(Operator Overloading)
date: 2019-03-25
tags:
  - c++
  - operator overloading
keywords:
  - c++
  - operator overloading
  - 연산자 오버로딩
---

## 연산자 오버로딩(Operator Overloading)
C++의 특징으로 **기존에 제공하고 있는 연산자를 재정의하여 사용자 정의 클래스로 사용하는 것을 의미**한다.<br>
**아래와 같은 연산자를 제외한 모든 연산자를 사용하여 전역 함수 또는 클래스로 재정의가 가능하다.**<br>
<br>
**::** (범위 지정)<br> 
**.** (멤버 선택)<br> 
**.*** (멤버 포인터 선택)<br> 
**?:** (조건)<br> 
**\#** (문자열 전처리기 변환)<br> 
**\##** (전처리기 연결)<br>

연산자 오버로딩은 'operator'이란 키워드와 연산자만을 이용해서 함수를 오버로딩 했다는 의미와 같이<br>
=> **'연산자를 오버로딩 했다'** 의 의미이다.

### 연산자 오버로딩(Operator Overloading) 규칙

 - 새로운 연산자(ex. **)를 정의할 수 없다. 기본 제공 연산자를 정의한다.
 - 기본 제공 데이터 형식에 적용할 때 연산자의 의미를 재정의할 수 없다.
 - 오버로딩한 연산자는 비정적(non-static)클래스 멤버 함수거나 전역 함수여야 한다.
   (priavte 또는 protected 접근자의 전역 함수는 해당 클래스의 friend로 선언해야 한다.)
 - 단항 연산자 또는 이항 연산자로 오버로딩할 수 있으며, 각 사용을 별도로 오버로딩할 수 있다.
 - 멤버 함수로 오버로드된 연산자의 첫 번째 파라미터는 항상 연산자가 호출되는 객체의 클래스 형식이다.

 ---

##### 아직까지는 잘 와닿지 않을 것 같다. 아래 예제를 보자.

```cpp
#include <iostream>
using namespace std;
class Point
{
public:
    Point(int _x, int _y)
    {
        x = _x;
        y = _y;
    }

private:
    int x, y;
};

void main()
{
    Point p1 = {1, 1};
    Point p2(2, 2);

    Point p3 = p1 + p2;
}
```


> 위의 코드에서 어떤 부분이 잘못되었는지 찾았으면 연산자 오버로딩의 역할을 제대로 알고 있다고 생각한다.<br>
**Point p3 = p1 + p2;** 부분에서 오류가 발생할 것이다.

> Point객체 p3은 p1과 p2를 더한 값으로 생성하고 싶은건데 Point 클래스는 +연산자가 무엇을 의미하는지 모른다.<br>
왜 당연한걸 모르냐고 할 수 있는데 <br>
x값, y값끼리 각각 더한 값을 의미하는건지, x값과 y값 모두 더한 값을 의미하는지 알 수가 없다.<br>

>이를 해결하기 위해 +연산자 오버로딩의 개념이 필요한 것이다.<br>

```cpp
class Point
{
public:
    Point(int _x, int _y)
    {
        x = _x;
        y = _y;
    }
    // +연산자 오버로딩
    Point operator +(Point& p) 
    {
        x = x + p.x;
        y = y + p.y;
        return Point(x, y);
    }

private:
    int x, y;
};
```

---

### <사용자 정의 클래스에 일반적으로 오버로딩하는 연산자 목록>

* **할당 연산자(Assignment Operator)**<br>
  '=' 
* **이진 산술 연산자(Binary Arithmetic Operator)**<br>
  '+' '-' '*' 
* **복합 할당 연산자(Compound Assignment Operator)**<br>
  '+=' '-=' '*=' 
* **비교 연산자(Comparison Operator)**<br>
  '==' '!=' 


## 1. 할당(대입) 연산자 =

할당 연산자란 말이 어색하다면 **대입 연산자**라는 말은 좀 덜 어색할 것이다. 같은 의미이다.<br>
위에서 정의한 Point 클래스를 기반으로 다음 main 함수를 확인해보자.

```cpp
void main()
{
    Point p1(1, 3);
    Point p2(10, 30);

    p1 = p2;
}
```

> 이번 예제에서는 **p1 = p2;**부분에서 오류가 발생할 것이라 예상할 것이다.<br>
역시 x값과 y값을 같게 하는건가? 뭐 확실하게 정의된 것이 없다고 생각하기 때문이다.<br>

> 그러나 반전은, 위의 Point 클래서 정의 부분에서 대입 연산자 정의 함수를 확인할 수 없음에도 불구하고,<br>
대입 연산자 오버로딩은 일어난다. 즉, 위의 main 함수에서는 잘못된 부분이 없다.<br>
-> 왜냐하면 **대입 연산자 오버로딩에 관해서만 디폴트 대입 연산자가 존재하기 때문이다.**

```cpp
// 디폴트 대입 연산자
Point& operator =(const Point& p)
{
    x = p.x;
    y = p.y;
    return *this;
}
```

---

### 번외,

연산자 오버로딩에 대해 포스팅할 내용이 너무 많은 관계로, 단계적으로 업데이트할 예정이다.<br>
해당 내용은 아직 미완성이란 것을 꼭 참고하시길..

---

###References

- [c++ 연산자 오버로딩 가이드라인](https://edykim.com/ko/post/c-operator-overloading-guidelines/)
- [C++ 연산자 오버로딩](https://yeolco.tistory.com/119)