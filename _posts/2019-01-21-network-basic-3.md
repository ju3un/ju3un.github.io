---
title: Overlapped I/O 그리고 IOCP - I/O 모델 (3)
date: 2019-01-21
tags:
  - I/O Model
  - overlapped
  - IOCP
keywords:
  - network
  - I/O Model
  - asynchronous
  - overlapped
  - IOCP
---

#####오늘은 Overlapped I/O 모델과 이의 확장 모델 IOCP 모델에 대해 포스팅하려 한다.

우리가 예를 들어 채팅 프로그램을 만든다고 할 때,<br> 
지난 포스팅에서 정리한 blocking, non-blocking과 synchronous, asynchronous 모델을 사용한다고 하자.<br>
아무리 non-blocking, asynchronous 모델을 적용한다고 해도, 하나의 스레드 내에서 여러 개의 소켓의 데이터를 처리하는 것은 한계가 있다.<br>
non-blocking, asynchronous 모델을 적용한 예를 들어보자,<br>

>예를 들어, 커널로부터 수신해야 하는 데이터 크기가 10만 바이트가 넘는다고 가정했을 때<br>
**non-blocking, asynchronous의 경우, 바로 작업 상황(결과)를 반환하기 때문에 데이터를 다 받지 않아도 리턴하는 문제가 발생한다.**<br>
->**"무한 루프를 통해 정해진 데이터 크기(10만 바이트)를 받을 때 까지 수신한다."** 방식으로 해결할 수 있지만,<br>
이 방식은 blocking방식과 별 다르지 않은 방식이다.<br>

따라서 이에 대한 해결 방안 중 하나의 모델로 Overlapped I/O 모델을 예로 들 수 있다.


##1. Overlapped I/O

지난 포스팅에서 blocking, non-blocking과 synchronous, asynchronous 모델에 대해 정리했다.<br>
**Overlapped I/O 모델은 non-blocking + asynchronous을 응용한 모델이다.**<br>
(참고로, blocking + asynchronous을 응용한 모델은 select모델이 있는데, 이 부분은 다음에 정리하기로 하자.)

>쉽게 이야기하면, Overlapped I/O 모델은 10만 바이트의 데이터를 전송한다고 가정할 때, <br> 
약 3.333만 비트로 쪼개서 동시에 보내는 방식이다.<br>
10만 바이트를 전송하는데 10초가 걸린다고 했을 때(1만 바이트 = 1초) 3만 바이트를 3번 동시에 전송한다면 3초 조금 넘는 시간이 걸릴 것이다.<br>

![](https://user-images.githubusercontent.com/41428527/51477362-995baf00-1dcb-11e9-96ea-eb617f141366.png)


>그리고 데이터 전송이 끝날 때, **완료했다는 이벤트를 notify한다.**

####여기서 '동시에'와 '완료 이벤트 notify' 부분이 키워드로, <br>
**하나의 스레드 내에 동시에 2개 이상의 데이터를 전송을 중첩시키는 것**을 의미한다.<br>
또한, 데이터의 입력이 완료되면, **완료 이벤트를 통지하여 이벤트를 받은 프로세스는 이벤트 객체 혹은 Completion Routine을 이용해서 데이터를 처리한다.**

---


##2. IOCP

###2-1. IOCP란?

- **Input/Output Completion Port의 약자.**
- **Overlapped I/O Model의 확장 모델**

>**여기서 Port는 네트워크 상의 의미가 아닌, 작업 혹은 서비스를 전담하기 위해 만들어지는 객체이다.**<br>
소켓이 포트가 특정 서비스로 데이터 입출력을 전달하기 위한 객체라고 이해하는 것이 좋겠다.

![](https://user-images.githubusercontent.com/41428527/51478110-daed5980-1dcd-11e9-869a-f9cffbb61426.png)

>그림과 같이
- **입출력이 완료되면, completion queue에 완료 보고가 쌓인다.**<br>
- **completion queue에 완료 보고가 있을 시에 worker Thread를 깨워 대기열의 보고를 읽어 데이터를 처리하는 방식이다.**

---

###2-2. IOCP 구조체와 함수

- Overlapped I/O 모델의 확장이기 때문에, Overlapped I/O 모델에서 사용하는 구조체와 함수를 사용한다.

####IOCP 중요 함수 3가지
**1. CreateIoCompletionPort()** 
>![](https://user-images.githubusercontent.com/41428527/51478841-ef325600-1dcf-11e9-9d00-5a84134042a7.png)

>-> 이 함수는 2가지 용도로 사용된다.

>![](https://user-images.githubusercontent.com/41428527/51479049-87c8d600-1dd0-11e9-83bc-ac8cf07aefbc.png)


**2. GetQueuedCompletionStatus()**
>![](https://user-images.githubusercontent.com/41428527/51478941-34568800-1dd0-11e9-968b-2ae74639158b.png)

>![](https://user-images.githubusercontent.com/41428527/51479000-6a940780-1dd0-11e9-9ac7-f0ae1ba6a3b8.png)

**3. PostQueuedCompletionStatus()**
>![](https://user-images.githubusercontent.com/41428527/51479217-fa39b600-1dd0-11e9-97db-49d90a74367c.png)

>![](https://user-images.githubusercontent.com/41428527/51479188-e5f5b900-1dd0-11e9-8130-5dcd43f2d7c1.png)


---

###2-3. IOCP 구현 절차

>![](https://user-images.githubusercontent.com/41428527/51479522-d4f97780-1dd1-11e9-878c-867090e5e099.png)

>(위 그림은 전 회사 업무 시 IOCP 로직을 로드화한 것으로, 지운 부분은 클래스 명으로 크게 신경쓰지 않아도 된다.)

---

###References

- [Overlapped I/O 모델](https://www.joinc.co.kr/w/man/12/overlapped)
- [Overlapped IO 모델](https://blog.naver.com/smuoon4680/50141782462)