# KT-P1: Audio-Visual Mini Astromech Droid

<div>
    <img src="https://img.shields.io/badge/Raspberry_Pi_Zero_2_W-e00053">
    <img src="https://img.shields.io/badge/In_Progress-yellow">
</div>


> May 2025

**KT Prototype 1:** A custom Star Wars mini astromech droid, featuring realtime audio-video. Controlled via smartphone. Chasis based on Baddeley's BB-R2 and styled after R2-KT.

**Project status:** In-Progress

## Project Overview
The KT Prototype 1 Mini Astromech is a realtime audio-video droid, remotely controlled from a smartphone. The droid's main computer is a Raspberry Pi Zero 2 W set in Wi-Fi Access-Point, which allows a user's smartphone to connect to it as a portable Wi-Fi network. The smartphone receives the droid's video feed and audio collected using a camera and microphone inside the droid's dome, and transmits movement commands and audio from the smartphone's mic, allowing a user to move and talk from the droid's speakers.

Chat-GPT was used during the system-level design process, and before purchasing components in order to predict any possible incompatibilities before assembly.

## Project Goals
- The droid should be able to move and rotate using 2 motorized wheels and differential propulsion.
- The droid should be controlled from a nearby smartphone at any reasonable location.
- The smartphone in control should be able to receive live audio and video from the droid.
- The droid should be able to receive audio from the smartphone and play it from on-board speakers.
- The droid should be able to rotate its dome, including its on-board camera, around its main body to better view its surroundings.
- The droid should be able to normally operate for 3 hours or longer on average.

# Components

## Electrical System Hardware
| Component | Role | Source | Estimated Current Draw |
| --------- | ---- | ------ | ---------------------- |
| Raspberry Pi Zero 2 W | Main astromech computer | [Amazon](https://www.amazon.com/dp/B09LH5SBPS) | 0.4 - 0.6 A |
| Raspberry Pi Camera Module, wide-angle | Live video feed | [Amazon](https://www.amazon.com/dp/B083XMGSVP) | ~0.25 A |
| WM8960 Audio HAT Module | Audio IO | [Amazon](https://www.amazon.com/dp/B098R7TTM4) | ~0.05 A |
| PCA9685 Servo Driver Board | Servo motor control | [AliExpress](https://www.aliexpress.us/item/3256808620007290.html) | ~0.1 A* |
| 3x MG90S Servo Motors | Main drive wheels, dome rotation | Donated from Rob :) | 0.4 A each (stall) |
| Geekworm X306 UPS Board | Power distribution | [Amazon](https://www.amazon.com/dp/B0B74NT38D) | |
| 18650 Battery Cell (9900mAh) | Power source | [Amazon](https://www.amazon.com/dp/B0CP5N3XMF) | |

*The PCA9685 can draw about 25mA per channel, with a maximum of 400mA. 100mA was estimated since I'm only using 3 channels, plus a little extra for safety. ([Source](https://forums.adafruit.com/viewtopic.php?t=148785))

## Additional Hardware
| Component | Source |
| --------- | ------ |
| Heatsink case for Raspberry Pi Zero 2 | [Amazon](https://www.amazon.com/dp/B0BLTZKKN9) |
| USB Type-C panel mount adapter | [Amazon](https://www.amazon.com/dp/B0D93S6C29) |
| USB Type-C 90-degree adapter | [Amazon](https://www.amazon.com/dp/B0D92JZLW8)
| LED lights | [Amazon](https://www.amazon.com/dp/B01AUI4VSI) |
| Light-up momentary switch | [Amazon](https://www.amazon.com/dp/B0DN13M5PF) |

## Software
// TODO

## References
- [Mr. Baddeley's BB-R2](https://www.printed-droid.com/kb/bb-r2/)
- [BB-R2 Assembly Guide](https://www.printed-droid.com/wp-content/uploads/2020/09/BB-R2-instructions.pdf)
