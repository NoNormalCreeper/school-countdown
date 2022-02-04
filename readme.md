# School Countdown
其实我在2021年暑假就已经用Discord机器人实现了这个功能，但是当时我一直想着弄成QQ机器人，但由于各种原因没有实现，很遗憾。

现在(2022.2)，QQ机器人又受到了疼讯的种种限制，所以我只好想到了网页版的这个方法。

## Build
*Currently only Windows is supported.*
### 1. Build Python environment
- [Download the package](https://www.python.org/downloads/windows/) and install Python *version>=3.8*.

- Run `autoinstall.py` to install modules required.

### 2. Run the server
- Run `run.bat` to run the server.

> Quite easy, isn't it?

## Contribution
Contributions are welcome, including but not limited to **improvements**, **new features**, **document and code improvements**, and **problem and error reporting**.

## Todo
- Fix known bugs
    - When the date input are illegal, the content displayed will become `NaN`.
    - Sometimes there are problems with the page layout.
- More animes
    - Floating animation of each element when entering the page.
    - Fade animation when closing the card of "adjust school start time".
