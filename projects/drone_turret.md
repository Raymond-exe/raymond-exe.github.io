# Autonomous Drone-Targeting Dart Turret 

<a href="https://www.youtube.com/watch?v=BIZtcLPPDtI" target="_blank">
    <img src="../images/turret_thumbnail.jpg">
</a>

> Contributors: Kevin Foyet, Jason Molina, David Nuckolls, Rob Ranit, and Raymond Wong <br>
> April 2024 － May 2024 <br>
> ECE 4300.01 － Computer Architecture

A fully-autonomous turret which can detect and fire one (or more) darts at a nearby drone. You can view the full project repository [here](https://docs.google.com/document/d/1pOIFu9WY_gL9sg0sMV9PNh2P3P-iyiJVVvix_5ne5tk).

**Project status:** Complete

## Project Overview:

// TODO state objective

### Goals & Criteria:
- The next state of the simulation must be a result of the current state of the simulation, and be consistent with the rules outlined by Conway.
- The simulation should have a user-controllable speed to determine how much time each generation should wait before progressing.
- The simulation speed should be controlled by an 8-bit value inputed from switches on the board.
- The simulation grid should contain a cursor. The presence of this cursor will not directly affect the next generation, but will allow a user to select a specific grid cell and toggle it on or off.
- The cursor should be controlled by 5 buttons found on the Nexys A7 board.
- The borders of the grid should allow for wrap-around logic that connect one edge to the opposing edge when generating the next generation or moving the cursor past one edge.
- The Nexys board should contain switches to pause and reset the simulation.
- The Nexys board should contain a switch to enable/disable the wrap-around logic applied to the grid borders.
- The Nexys board should display the 8-bit speed value on the left 3 seven-segment-display digits.
- The Nexys board should display the current generation count on the right 4 seven-segment-display digits.

### Images and Media

Click [here](https://www.youtube.com/watch?v=BIZtcLPPDtI) to view a video demonstration of this project.

<a href="https://github.com/Raymond-exe/Conway.v/assets/42707243/05eb05ea-bf4d-4c42-b5f0-8466407c0190" target="_blank">
    <img src="https://github.com/Raymond-exe/Conway.v/assets/42707243/05eb05ea-bf4d-4c42-b5f0-8466407c0190">
</a>
<a href="https://www.youtube.com/watch?v=CcwDj1lyKrI" target="_blank">
    <img src="https://github.com/Raymond-exe/Conway.v/assets/42707243/cc5fa935-eb8a-4adc-9eb4-0fd7a96c14f7">
</a>

<br>

### Hardware Used:
- Raspberry Pi 5 (8 GB)
- Electronically-controlled dart gun ("Automatic Tommy 20")
- PCA9685 Servo Driver
- 4x Servo Motors
    - Pitch Servo
    - Yaw Servo
    - 2x Servos controlling physical toggle switches
- Standard Raspberry Pi camera module


## Team Members:
- Kevin Foyet
- Jason Molina
- David Nuckolls
- Richie (Raymond) Wong
- with contributions from Rob Ranit


### Roles and Responsibilities:
- Team Lead: Raymond Wong
- YOLOv8 Implementation: Kevin Foyet
- Testing & Documentation: David Nuckolls

### Project Deliverables:
- [Video Demonstration](https://www.youtube.com/watch?v=BIZtcLPPDtI)
- [Final Project Report](https://docs.google.com/document/d/1pOIFu9WY_gL9sg0sMV9PNh2P3P-iyiJVVvix_5ne5tk/)

### References:
- ["YOLOv8 Docs" *Ultralytics*](https://docs.ultralytics.com/models/yolov8/)
- ["Quick Start Guide: Raspberry Pi with Ultralytics YOLOv8" *Ultralytics*](https://docs.ultralytics.com/guides/raspberry-pi/)
- ["Adafruit PCA9685 16-Channel Servo Driver" *Adafruit Learning System*](https://learn.adafruit.com/16-channel-pwm-servo-driver/overview)
- ["CircuitPython Libraries on Linux and Raspberry Pi" *Adafruit Learning System*](https://learn.adafruit.com/circuitpython-on-raspberrypi-linux)
- ["You Only Look Once: Unified, Real-Time Object Detection" *The Computer Vision Foundation*, Digikey](https://www.cv-foundation.org/openaccess/content_cvpr_2016/papers/Redmon_You_Only_Look_CVPR_2016_paper.pdf)
