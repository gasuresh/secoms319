import time
import board
import adafruit_dht
import json
import socket
import time
from datetime import datetime
import math

#bufferSize = 1024

#msgFromServer = "Hello Gautham"

#serverPort = 2222
#serverIP = "10.36.125.234"
#bytesToSend = msgFromServer.encode("utf-8")

#rpiSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#rpiSocket.bind(serverIP, serverPort)

# ~ print("Server is active and listening. Yaaay")

# ~ message,address = rpiSocket.recvfrom(bufferSize)

# ~ message = message.decode("utf-8")
# ~ print(message)
# ~ print("Client Address", address[0])



#Initialize the dht device, with the connected data pin

dhtDevice = adafruit_dht.DHT11(board.D4)

while True:
	try:
		# Print the values to the serial port
		temperature_c = dhtDevice.temperature
		temperature_f = temperature_c*(9/5) + 32
		temperature_c = round(temperature_c, 2)
		temperature_f = round(temperature_f, 2)
		
		humidity = dhtDevice.humidity
		
		dateInfo = datetime.now().strftime("%Y-%-m-%d %H:%M:%S")
		
		
		data = {"date": dateInfo, "temp_c" : temperature_c, "temp_f": temperature_f, "humidity": humidity}
		
		with open("data.json","w") as outfile:
			json.dump(data, outfile)
		
		#socket.sendall(json.dump(data).encode())
		
		print("Temp: {:.1f} F / {:.1f} C    Humidity: {}%"
				.format(temperature_f, temperature_c, humidity))
	
	except RuntimeError as error:
		print(error.args[0])
	
	time.sleep(2.0)
		
