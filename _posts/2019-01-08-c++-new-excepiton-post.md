---
title: C++ new 동적 메모리 할당 시 bad_alloc 예외처리
date: 2019-01-08
tags:
  - c++
  - bad_alloc
  - new
keywords:
  - c++
  - bad_alloc
  - new
  - exception
attachments:
---

###C++ 개발 시 흔히 볼 수 있는 new 동적 메모리 할당 관련 코드다.

```cpp
char* pChar = new char[10];
if(pChar != nullptr)
{
  ..
  return;
}
```
>이와 같이 메모리를 할당하고 할당 여부를 체크하기 위한 널 포인터 검사를 통해 예외 처리를 한다.

**근데 여기서 간과한 것이 있다.**
###만약 new 연산자를 통한 메모리 할당이 실패하는 경우를 생각해보았는가?

>위의 널 포인터 체크하는 방식은 **할당 성공/실패** 여부를 고려한 것이 아니다.<br> 
보통 메모리 할당에 성공했다는 전제 하에 단순히 할당된 메모리가 있는지 체크하기 위해 위와 같은 코드를 작성한다.<br>
예를 들어, 내가 메모리를 할당하지 않고 접근하는 것은 아닌지, 혹은 이전에 메모리를 해제하지는 않았는지를 체크하기 위한 예외처리라고 생각하면 된다.

>그러나 new 연산자를 통한 메모리 할당이 실패할 경우는 예외가 발생하여 **프로그램이 즉시 종료**된다.<br>
따라서 위의 널 포인터 체크하는 예외 처리가 메모리 할당 실패할 경우 예외 처리에 전혀 도움을 주지 못한다.<br>
널 포인터 체크하기도 전에 프로그램이 종료될테니까...<br>
**즉, 널 포인터 체크로는 new 연산자에 대한 예외처리를 할 수 없다.**<br>

---

###그렇다면 프로그램이 종료되는 것을 방지하기 위해 올바른 예외처리를 해야 한다!

```cpp
char* pChar;

try
{
  pChar = new char[10];
}
catch( const char* )
{
  if( pChar == nullptr )
  {
    ..
  }
}
```

>예외처리했다! 아니.. 잘못된 코드다.<br>
>###명심해야 한다. 잘못된 코드다.

---

###new 연산자 관련된 MSDN을 검색해보면 다음 내용을 확인할 수 있다.
>Beginning in Visual C++ .NET 2002, the CRT's new function (in libc.lib, libcd.lib, libcmt.lib, libcmtd.lib, msvcrt.lib, and msvcrtd.lib) will continue to return NULL if memory allocation fails. However, the new function in the Standard C++ Library (in libcp.lib, libcpd.lib, libcpmt.lib, libcpmtd.lib, msvcprt.lib, and msvcprtd.lib) will support the behavior specified in the C++ standard, which is to throw a std::bad_alloc exception if the memory allocation fails.

####여기서 키워드는 std::bad_alloc exception.
**new 연산자가 메모리 할당에 실패할 경우, C++ Standard에서는 std::bad_alloc exception을 throw하는 동작을 지원한다는 것이다.**

###올바른 예외 처리 1
```cpp
char* pChar;

try
{
  pChar = new char[10];
}
catch( const std::bad_alloc& e )
{
  ..
}
```

###올바른 예외 처리 2
```cpp
char* pChar;

pChar = new ( std::nothrow ) char[10];

if( pChar != nullptr )
{
	..
}
else
{
	..
}
```
>이 방법은, nothrow를 이용한 방법으로, 예외를 nullptr로 throw 해주는 방식이다.<br>
###nothrow에 관해 C++ Reference - Cplusplus에서 다음과 같은 내용을 확인할 수 있다.
>This constant value is used as an argument for operator new and operator new[] to indicate that these functions shall not throw an exception on failure, but return a null pointer instead.
