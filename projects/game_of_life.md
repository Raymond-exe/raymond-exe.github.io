# Conway's *Game of Life* on FPGA
> November 2023 - December 2023

## Project Overview:

The objective of this project is to implement Mathematician’s John Horton Conway’s Game of Life simulation in Verilog, run it on an FPGA, and display the grid of cells via VGA. The development board used to run this project is the Nexys A7 FPGA board.

### Project Goals & Criteria:
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

### Diagrams and Images

### Technologies and Tools Used:
- Digilent Nexys A7 FPGA Development Board
- Xilinx Vivado 2018.1
- VGA-compatible display

## Team Members:
- Gerin Fajardo
- Kevin Foyet
- Tyler Marts
- Richie Raymond Wong

### Roles and Responsibilities:
- [Role 1]: [Assigned Team Member(s)]
- [Role 2]: [Assigned Team Member(s)]
- [Role 3]: [Assigned Team Member(s)]
- ...

### Risks and Challenges:
- [Risk/Challenge 1]
- [Risk/Challenge 2]
- [Risk/Challenge 3]
- ...

## Outcome
[Describe project outcome]

### Project Deliverables:
- [Video Demonstration](https://www.youtube.com/watch?v=CcwDj1lyKrI)
- [Final Project Report](https://docs.google.com/document/d/1esijIz1XCN74vlpnBnkL7jEymoO07kjb9qlBPdcqF9o/)
- [Slide Presentation](https://docs.google.com/presentation/d/1LQ7xOMkXpIEDJPGi3g7aL3DAkkkGK73WHjV46hEZqLs/)
- ...

### References:
- ["Conway’s Game of Life" *Wikipedia*](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- ["Binary to BCD and BCD to Binary" *Real Digital*](https://www.realdigital.org/doc/6dae6583570fd816d1d675b93578203d)
- ["Nexys A7-100T Master Constraints File" *Digilent* on  GitHub](https://github.com/Digilent/digilent-xdc/blob/master/Nexys-A7-100T-Master.xdc)
- ["Snake Game on FPGA in Verilog" *Krishnajith S S*](https://www.slideshare.net/sskrishnajith/snake-game-on-fpga-in-verilog)
- ["VGA Controller (VHDL)" *Scott Larson*, Digikey](https://forum.digikey.com/t/vga-controller-vhdl/12794)
