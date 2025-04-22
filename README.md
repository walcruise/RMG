# RMG - Smart Contract Interaction App

This application allows users to interact with two smart contracts (longtrade and shorttrade) using their respective addresses and ABIs. Users can initiate both smart contracts simultaneously, with functionality to control execution intervals and modes.

## Features

- **Smart Contract Interaction**: Interact with longtrade and shorttrade contracts
- **Execution Modes**:
  - Simultaneous Execution: Initiate both smart contracts in one click
  - Interval Execution: Execute at 3-second intervals
  - Run Once: Trigger both contracts just once
- **Control Buttons**:
  - Start Button: Begins continuous execution at 3-second intervals
  - Stop Button: Halts all ongoing executions
  - Run Once Button: Executes the contracts one time
- **User Interface**: Simple and intuitive UI with labeled buttons and execution logs

## Technical Stack

- Next.js for the frontend framework
- ethers.js for Ethereum blockchain interaction
- Tailwind CSS for styling

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Connect your wallet by clicking the "Connect Wallet" button
2. Use the control buttons to interact with the smart contracts:
   - "Start" - Begin continuous execution every 3 seconds
   - "Stop" - Halt all ongoing executions
   - "Run Once" - Execute both contracts a single time

## Security Notes

- Ensure you have sufficient funds for gas fees
- Always verify contract interactions before confirming transactions