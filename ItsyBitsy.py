import win32com.client
import time
import os
import sys
import re

wb = win32com.client.Dispatch("InternetExplorer.Application")
wb.Visible = 1
wb.Navigate("http://itsm.ss.sw.ericsson.se/")
#wb.Navigate("www.google.com")

while (wb.busy): #wb.ReadyState != 4 or wb.Document.Readystate != "Complete"):
 time.sleep(5)

#wb.Document.GetElementById("USER").Value == ""
#wb.Document.GetElementById("password").Value == ""

#while (wb.busy):
# time.sleep(10)

#wb.document.all.IMAGE1.click()

action = input("Press Q to quit. Press Enter to continue. ")
 
if action == Q:
 sys.exit("Exiting Script")
else
 text = wb.document.documentElement.innerText
 html = wb.document.documentElement.innerHTML

 search = input("Data retrieved, please input search term. ")
 matching = re.match(search,text, re.I)

#path1 = "C:\dat.txt"
#path1 =  os.path.normpath(path1)

#with open(path1,"w+") as file1:
# file1.write(text)
# file1.write(html)

#print(text)
#print(html)
