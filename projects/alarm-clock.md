# FPGA Digital Alarm Clock

<div>
    <img src="https://img.shields.io/badge/Nexys_A7-3d902a">
    <img src="https://img.shields.io/badge/Completed_2024-green">
</div>

<a href="../images/clock/alarm_clk_demo.gif" target="_blank"><img src="../images/clock/alarm_clk_demo.gif"></a>

A Verilog-based digital alarm clock implemented on a Nexys A7 FPGA board. You can view the full project repository [here](https://github.com/Raymond-exe/FPGA-Alarm-Clock).

**Project status:** Complete


## Input/Outputs
The following inputs are used to edit the current time, set an alarm, etc. The use of each input will vary depending on the current state of the device (with the exception of EN and RST).
- Enable switch ("`EN`"): Altering this switch will always pause/resume the device's progression of time.
- Reset switch ("`RST`"): This switch will always clear all registers when HIGH.
- Set of 4 switches (later referred to as "BCD switches")
- Left button
- Right button
- Select/Edit button
- Snooze button

The following outputs of the Nexys A7 are used to express the clock's current state and time:
- All 8 digits of the on-board 7-segment displays (Time in HH:MM SS.MS format)
- The 4 left-most LEDs ("alarm status" LEDs)
- The 4 right-most LEDs ("alarm match" LEDs)
- Red RGB LED #1 ("Edit Mode" LED)
- Red RGB LED #2 ("AM/PM" LED)

<a href="../images/clock/alarm_clk.jpeg" target="_blank"><img src="../images/clock/alarm_clk.jpeg"></a>

## Device States
There are several states the alarm clock can occupy:
- Home
- Edit time
- Edit alarm (1-4)

In all states, `EN` and `RST` will always have the same effect (described in I/O above).

**Home state:** A state of normal operation for the clock. The controls for this state are as follows:
- BCD switch 1-4: Enable/disable the coresponding alarm. If an alarm is disabled, it will not be triggered at the set time.
- Left button: No action
- Right button: No action
- Select/Edit button: Changes the device's current state to **Edit time** OR **Edit alarm**.
    - If all BCD switches are OFF/LOW, the next state will be **Edit time**.
    - If exactly one BCD switch is ON/HIGH, the next state will be **Edit alarm** (editing the alarm selected by the BCD switch)
    - If more than one BCD switch is ON/HIGH, no action will occur
- Snooze button: Silences all alarms currently triggered. If an alarm is left enabled through the related BCD switch, it will trigger again the next time its time matches.

**Edit time:** A state allowing the user to edit the device's current time. The device's current time *WILL NOT* progress while in this state, and the second/millisecond registers will be reset upon exiting this state. A digit or value is selected to edit, referred to here as the "selected register". The controls for this state are as follows:
- BCD switch 1-4: Changes the selected register's value to match the BCD value represented by the BCD switches.
- Left button: Switches the selected register to the register LEFT of the one currently selected.
- Right button: Switches the selected register to the register RIGHT of the one currently selected.
- Select/Edit button: Exits the **Edit time** state and returns the device to the **Home state**. This also resets the second/millisecond registers to 0.
- Snooze button: Toggles AM/PM of the device's current time.

**Edit alarm:** A state allowing the user to edit an alarm previously selected while in the **Home state**. The operation of this state is very similar to the **Edit time** state, however exiting this state *will not* reset the second & millisecond registers. Additionally, the device's current time *WILL* progress while in this state. The controls for this state are as follows:
- BCD switch 1-4: Changes the selected register's value to match the BCD value represented by the BCD switches.
- Left button: Switches the selected register to the register LEFT of the one currently selected.
- Right button: Switches the selected register to the register RIGHT of the one currently selected.
- Select/Edit button: Exits the **Edit alarm** state and returns the device to the **Home state**. Pressing this *WILL NOT* reset the second/millisecond registers to 0.
- Snooze button: Toggles AM/PM of the alarm being edited.

## Modules

### Topfile (top.v)
The top module containing all other modules in this project. This file establishes all inputs, outputs, and handles all small-scale logical operations necessary for manipulating inputs for other modules. A counter module is created for each time register (hours, minutes, seconds, 10-milliseconds) and relies on the clock manager to trigger the 10ms clock to update the 10ms register. Each counter thereafter relies on the overflow signal of the lesser counter.

### Counter (counter.v)
A simple module dedicated to counting an internal value and determining when to perform a controlled overflow - resetting the internal value to 0 and setting the overflow output signal to HIGH for one clock cycle.

### Alarm (alarm.v)
A module which waits for the current (externally passed) hour and minutes to match an internal hour and minute register, which can be set by setting the LOAD input signal to HIGH. Once the current hour and minute match the internal registers, an alarm_match signal is set to high and can be reset using the reset_alarm_match.

### Time Editor (time_editor.v)
A module determines the new values for the hour and minute based on the currently selected digit and the position of the BCD switches, which are connected as inputs from the top module.

### Other modules
- Clock manager (clk_manager.v)
- Binary -> BCD Converter (binary_bcd.v)
- Seven-Segment Display Driver (ssd_driver.v)
- Button Debouncer (debouncer.v)

## References
The resources linked below were used when creating this project.
- Input debouncer - [Electrical Engineering Stack Exchange](https://electronics.stackexchange.com/questions/505911/debounce-circuit-design-in-verilog)
- Binary to BCD converter - [RealDigital](https://www.realdigital.org/doc/6dae6583570fd816d1d675b93578203d)
- Nexys A7 100T Constraints - [Digilient on GitHub](https://github.com/Digilent/Nexys-A7-100T-Keyboard/blob/master/src/constraints/Nexys-A7-100T-Master.xdc)
