import csv
import json
from pathlib import Path

root = Path(__file__).resolve().parent.parent
src_data = root / 'src' / 'data'
src_data.mkdir(parents=True, exist_ok=True)

files = [
    ('cars_ds_final.csv', 'final'),
    ('cars_ds_final_2021.csv', 'final_2021')
]

all_records = {}

for filename, source in files:
    path = root / filename
    with path.open('r', encoding='utf-8', newline='') as f:
        reader = csv.DictReader(f)
        rows = []
        for row in reader:
            row = {k: v.strip() for k, v in row.items() if k is not None}
            row.pop('', None)
            if not row.get('Make') and not row.get('Model'):
                continue

            price_raw = row.get('Ex-Showroom_Price', '')
            price_clean = price_raw.replace('Rs.', '').replace('Rs', '').replace(',', '').strip()
            price_value = None
            try:
                price_value = float(price_clean)
            except ValueError:
                price_value = None

            key = '|'.join([
                row.get('Make', ''),
                row.get('Model', ''),
                row.get('Variant', ''),
                row.get('Ex-Showroom_Price', '')
            ])

            excluded_keys = {
                'Make', 'Model', 'Variant', 'Ex-Showroom_Price', 'Displacement', 'Cylinders',
                'Valves_Per_Cylinder', 'Drivetrain', 'Cylinder_Configuration', 'Emission_Norm',
                'Engine_Location', 'Fuel_System', 'Fuel_Tank_Capacity', 'Fuel_Type', 'Height',
                'Length', 'Width', 'Body_Type', 'Doors', 'City_Mileage', 'Highway_Mileage',
                'ARAI_Certified_Mileage', 'ARAI_Certified_Mileage_for_CNG', 'Kerb_Weight', 'Gears',
                'Ground_Clearance', 'Front_Brakes', 'Rear_Brakes', 'Front_Suspension',
                'Rear_Suspension', 'Front_Track', 'Rear_Track', 'Front_Tyre_&_Rim',
                'Rear_Tyre_&_Rim', 'Power_Steering', 'Power_Windows', 'Power_Seats',
                'Keyless_Entry', 'Power', 'Torque', 'Odometer', 'Speedometer', 'Tachometer',
                'Tripmeter', 'Seating_Capacity', 'Seats_Material', 'Type', 'Wheelbase',
                'Wheels_Size', 'Start_/_Stop_Button', '12v_Power_Outlet', 'Audiosystem',
                'Aux-in_Compatibility', 'Average_Fuel_Consumption', 'Basic_Warranty', 'Bluetooth',
                'Boot-lid_Opener', 'Boot_Space', 'CD_/_MP3_/_DVD_Player', 'Central_Locking',
                'Child_Safety_Locks', 'Clock', 'Cup_Holders', 'Distance_to_Empty', 'Door_Pockets',
                'Engine_Malfunction_Light', 'Extended_Warranty', 'FM_Radio', 'Fuel-lid_Opener',
                'Fuel_Gauge', 'Handbrake', 'Instrument_Console', 'Low_Fuel_Warning',
                'Minimum_Turning_Radius', 'Multifunction_Display', 'Sun_Visor', 'Third_Row_AC_Vents',
                'Ventilation_System', 'Auto-Dimming_Rear-View_Mirror', 'Hill_Assist', 'Gear_Indicator',
                '3_Point_Seat-Belt_in_Middle_Rear_Seat', 'Ambient_Lightning', 'Cargo/Boot_Lights',
                'Drive_Modes', 'Engine_Immobilizer', 'High_Speed_Alert_System',
                'Lane_Watch_Camera/_Side_Mirror_Camera', 'Passenger_Side_Seat-Belt_Reminder',
                'Seat_Back_Pockets', 'Voice_Recognition', 'Walk_Away_Auto_Car_Lock',
                'ABS_(Anti-lock_Braking_System)', 'Headlight_Reminder', 'Adjustable_Headrests',
                'Gross_Vehicle_Weight', 'Airbags', 'Door_Ajar_Warning',
                'EBD_(Electronic_Brake-force_Distribution)', 'Fasten_Seat_Belt_Warning',
                'Gear_Shift_Reminder', 'Number_of_Airbags', 'Compression_Ratio',
                'Adjustable_Steering_Column', 'Other_Specs', 'Other_specs', 'Parking_Assistance',
                'Key_Off_Reminder', 'USB_Compatibility', 'Android_Auto', 'Apple_CarPlay',
                'Cigarette_Lighter', 'Infotainment_Screen', 'Multifunction_Steering_Wheel',
                'Average_Speed', 'EBA_(Electronic_Brake_Assist)', 'Seat_Height_Adjustment',
                'Navigation_System', 'Second_Row_AC_Vents', 'Tyre_Pressure_Monitoring_System',
                'Rear_Center'
            }
            normalized = {
                'source': source,
                'make': row.get('Make', ''),
                'model': row.get('Model', ''),
                'variant': row.get('Variant', ''),
                'exShowroomPriceRaw': price_raw,
                'exShowroomPrice': price_value,
                'displacement': row.get('Displacement', ''),
                'cylinders': row.get('Cylinders', ''),
                'valvesPerCylinder': row.get('Valves_Per_Cylinder', ''),
                'drivetrain': row.get('Drivetrain', ''),
                'cylinderConfiguration': row.get('Cylinder_Configuration', ''),
                'emissionNorm': row.get('Emission_Norm', ''),
                'engineLocation': row.get('Engine_Location', ''),
                'fuelSystem': row.get('Fuel_System', ''),
                'fuelTankCapacity': row.get('Fuel_Tank_Capacity', ''),
                'fuelType': row.get('Fuel_Type', ''),
                'bodyType': row.get('Body_Type', ''),
                'doors': row.get('Doors', ''),
                'cityMileage': row.get('City_Mileage', ''),
                'highwayMileage': row.get('Highway_Mileage', ''),
                'araiCertifiedMileage': row.get('ARAI_Certified_Mileage', ''),
                'kerbWeight': row.get('Kerb_Weight', ''),
                'gears': row.get('Gears', ''),
                'groundClearance': row.get('Ground_Clearance', ''),
                'frontBrakes': row.get('Front_Brakes', ''),
                'rearBrakes': row.get('Rear_Brakes', ''),
                'frontSuspension': row.get('Front_Suspension', ''),
                'rearSuspension': row.get('Rear_Suspension', ''),
                'power': row.get('Power', ''),
                'torque': row.get('Torque', ''),
                'seatingCapacity': row.get('Seating_Capacity', ''),
                'wheelbase': row.get('Wheelbase', ''),
                'otherSpecs': {k: v for k, v in row.items() if k not in excluded_keys}
            }

            existing = all_records.get(key)
            if existing is None or existing['source'] == 'final':
                all_records[key] = normalized
            rows.append(normalized)

    output_path = src_data / f"{Path(filename).stem}.json"
    with output_path.open('w', encoding='utf-8') as out:
        json.dump(rows, out, indent=2)
    print(f'Wrote {len(rows)} records to', output_path)

combined = list(all_records.values())
for idx, item in enumerate(combined, start=1):
    item['id'] = f'car-{idx:04d}'

with (src_data / 'cars_ds_combined.json').open('w', encoding='utf-8') as out:
    json.dump(combined, out, indent=2)
print('Wrote', len(combined), 'combined records to', src_data / 'cars_ds_combined.json')
