export const driverTemplates = {
  plc: `import time
import json
from typing import Dict, Any

class PLCDriver:
    def __init__(self, ip: str, port: int):
        self.ip = ip
        self.port = port
        self.connected = False
        self.data: Dict[str, Any] = {}

    def connect(self) -> bool:
        try:
            print(f"Connecting to PLC at {self.ip}:{self.port}")
            self.connected = True
            return True
        except Exception as e:
            print(f"Connection error: {str(e)}")
            return False

    def read_data(self, address: str) -> Any:
        if not self.connected:
            raise ConnectionError("Not connected to PLC")
        return self.data.get(address)

    def write_data(self, address: str, value: Any) -> bool:
        if not self.connected:
            raise ConnectionError("Not connected to PLC")
        self.data[address] = value
        return True

def main():
    driver = PLCDriver("192.168.1.100", 502)
    if driver.connect():
        print("Connected successfully")
        driver.write_data("DB1.DBW0", 100)
        value = driver.read_data("DB1.DBW0")
        print(f"Read value: {value}")

if __name__ == "__main__":
    main()`,

  modbus: `import time
from typing import List

class ModbusDriver:
    def __init__(self, ip: str, port: int):
        self.ip = ip
        self.port = port
        self.connected = False

    def connect(self) -> bool:
        try:
            print(f"Connecting to Modbus device at {self.ip}:{self.port}")
            self.connected = True
            return True
        except Exception as e:
            print(f"Connection error: {str(e)}")
            return False

    def read_holding_registers(self, address: int, count: int) -> List[int]:
        if not self.connected:
            raise ConnectionError("Not connected to device")
        return [0] * count  # Simulated reading

    def write_holding_register(self, address: int, value: int) -> bool:
        if not self.connected:
            raise ConnectionError("Not connected to device")
        print(f"Writing {value} to address {address}")
        return True

def main():
    driver = ModbusDriver("192.168.1.100", 502)
    if driver.connect():
        print("Connected successfully")
        driver.write_holding_register(100, 42)
        values = driver.read_holding_registers(100, 1)
        print(f"Read values: {values}")

if __name__ == "__main__":
    main()`,

  canbus: `import time
from typing import Dict

class CANBusDriver:
    def __init__(self, channel: str, bitrate: int = 500000):
        self.channel = channel
        self.bitrate = bitrate
        self.connected = False

    def connect(self) -> bool:
        try:
            print(f"Connecting to CAN bus on channel {self.channel}")
            self.connected = True
            return True
        except Exception as e:
            print(f"Connection error: {str(e)}")
            return False

    def send_message(self, id: int, data: bytes) -> bool:
        if not self.connected:
            raise ConnectionError("Not connected to CAN bus")
        print(f"Sending message ID: {id}, Data: {data.hex()}")
        return True

    def receive_message(self, timeout: float = 1.0) -> Dict:
        if not self.connected:
            raise ConnectionError("Not connected to CAN bus")
        return {"id": 0x123, "data": bytes([0, 1, 2, 3])}

def main():
    driver = CANBusDriver("can0")
    if driver.connect():
        print("Connected successfully")
        driver.send_message(0x123, bytes([1, 2, 3, 4]))
        msg = driver.receive_message()
        print(f"Received message: {msg}")

if __name__ == "__main__":
    main()`,

  scpi: `import time
from typing import Any

class SCPIDriver:
    def __init__(self, address: str):
        self.address = address
        self.connected = False

    def connect(self) -> bool:
        try:
            print(f"Connecting to SCPI device at {self.address}")
            self.connected = True
            return True
        except Exception as e:
            print(f"Connection error: {str(e)}")
            return False

    def send_command(self, command: str) -> None:
        if not self.connected:
            raise ConnectionError("Not connected to device")
        print(f"Sending command: {command}")

    def query(self, command: str) -> str:
        if not self.connected:
            raise ConnectionError("Not connected to device")
        return f"Response to: {command}"

def main():
    driver = SCPIDriver("TCPIP::192.168.1.100::INSTR")
    if driver.connect():
        print("Connected successfully")
        driver.send_command("*RST")
        idn = driver.query("*IDN?")
        print(f"Device identification: {idn}")

if __name__ == "__main__":
    main()`
};