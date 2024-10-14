import tkinter as tk
from tkinter import filedialog, messagebox
import pandas as pd
import pyreadstat

def convert_sav_to_excel():
    # Open file dialog to select .sav file
    sav_file = filedialog.askopenfilename(filetypes=[("SPSS Files", "*.sav")])
    
    if not sav_file:
        return
    
    try:
        # Read the .sav file
        df, meta = pyreadstat.read_sav(sav_file)
        
        # Open file dialog to save Excel file
        excel_file = filedialog.asksaveasfilename(defaultextension=".xlsx", filetypes=[("Excel Files", "*.xlsx")])
        
        if not excel_file:
            return
        
        # Save the dataframe as Excel
        df.to_excel(excel_file, index=False)
        
        messagebox.showinfo("Success", f"File converted successfully and saved as {excel_file}")
    except Exception as e:
        messagebox.showerror("Error", f"An error occurred: {str(e)}")

# Create the main window
root = tk.Tk()
root.title("SAV to Excel Converter")
root.geometry("300x150")

# Create and pack a label
label = tk.Label(root, text="Click the button to convert SAV to Excel")
label.pack(pady=20)

# Create and pack a button
convert_button = tk.Button(root, text="Convert SAV to Excel", command=convert_sav_to_excel)
convert_button.pack()

# Start the GUI event loop
root.mainloop()
