import qrcode
import json
from datetime import datetime
from werkzeug.security import generate_password_hash

# Sample JSON data
data = {
        "userId": "123455680",
        "name": "Charlie Brown",
        "dob": str(datetime.strptime("1995-10-05", "%Y-%m-%d")),
        "pin": generate_password_hash("9012"),
        "amount": 800
    }
# Convert the dictionary to a JSON string
json_data = json.dumps(data)

# Generate QR code
qr = qrcode.QRCode(
    version=1,  # Controls the size of the QR code
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(json_data)
qr.make(fit=True)

# Create the QR code image
img = qr.make_image(fill_color="black", back_color="white")

# Save the QR code image
img.save("json_qr_code.png")

print("QR code saved as json_qr_code.png")
