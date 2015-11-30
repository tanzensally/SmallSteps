import win32com.client
import time
import os
import sys
import re

wb = win32com.client.Dispatch("InternetExplorer.Application")
wb.Visible = 0
wb.Navigate("www.google.com")

while (wb.busy): #wb.ReadyState != 4 or wb.Document.Readystate != "Complete"):
 time.sleep(5)

#wb.Document.GetElementById("USER").Value == ""
#wb.Document.GetElementById("password").Value == ""

#while (wb.busy):
# time.sleep(10)

#wb.document.all.IMAGE1.click()

while True:
 action = input("\nPress q + Enter to quit. c + Enter to continue. \n")
 
 if action == 'q':
  wb.quit()
  sys.exit("\nExiting Script\n")
  
 elif action == 'c':
  text = wb.document.documentElement.innerText
  html = wb.document.documentElement.innerHTML

  term = input("\nData retrieved, please input search term: \n")
  
  seachingText = re.finditer(term,text,re.I)
  seachingHTML = re.finditer(term,html,re.I)
  
  Textfound = re.search(term,text,re.I)
  HTMLfound = re.search(term,html,re.I)

  if Textfound:
   print ("\nDocument.text: \n")
   for s in seachingText:
    print (s.start(),s.end(),s.group())
  else:
   print ("\nNo matches in Document.text\n")
  
  if HTMLfound:
   print ("\nDocument.HTML: \n")
   for s in seachingHTML:
    print (s.start(),s.end(),s.group())
  else:
   print ("\nNo matches in Document.HTML\n")
  
  extend = input("\nExtend lines? y/n \n")
  
  if extend == 'y':
   seachingText = re.finditer('(.{25})'+term+'(.{25})',text,re.I)
   seachingHTML = re.finditer('(.{25})'+term+'(.{25})',html,re.I)
   
   if Textfound:
    print ("\nDocument.text: \n")
    for s in seachingText:
     print (s.start(),s.end(),s.group())
   else:
    print ("\nNo matches in Document.text\n")

   if HTMLfound:
    print ("\nDocument.HTML: \n")
    for s in seachingHTML:
     print (s.start(),s.end(),s.group())
   else:
    print ("\nNo matches in Document.HTML\n")
   

#path1 = "C:\dat.txt"
#path1 =  os.path.normpath(path1)

#with open(path1,"w+") as file1:
# file1.write(text)
# file1.write(html)

#print(text)
#print(html)
