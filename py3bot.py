#!/usr/bin/env python3

import sys
import socket
import string

HOST = "irc.freenode.net"
PORT = 6667

NICK = ""
IDENT = ""
REALNAME = ""
MASTER = ""

readbuffer = ""

s=socket.socket( )
s.connect((HOST, PORT))

s.send(bytes("NICK %s\r\n" % NICK, "UTF-8"))
s.send(bytes("USER %s %s bla :%s\r\n" % (IDENT, HOST, REALNAME), "UTF-8"))
s.send(bytes("JOIN #botTesting\r\n", "UTF-8"));
s.send(bytes("PRIVMSG %s :Hello, testing 1 2 3\r\n" % MASTER, "UTF-8"))

while 1:
    readbuffer = readbuffer+s.recv(1024).decode("UTF-8") #readbuffer = readbuffer+s.recv(512).decode("UTF-8")
    temp = str.split(readbuffer, "\n") #temp = str.split(readbuffer)
    readbuffer=temp.pop( )

    for line in temp:
        line = str.rstrip(line)
        line = str.split(line)

        if(line[0] == "PING"):
            s.send(bytes("PONG %s\r\n" % line[1], "UTF-8"))

        if(line[1] == "PRIVMSG"):
            if(line[3] == ":!echo"):
                sender = ""
                for char in line[0]:
                    if(char == "!"):
                        break
                    if(char != ":"):
                        sender += char 
                size = len(line)
                i = 3
                message = ""
                while(i < size): 
                    message += line[i] + " "
                    i = i + 1
                message.lstrip(":")
                s.send(bytes("PRIVMSG %s %s \r\n" % (sender, message), "UTF-8"))
            elif(line [3] == ":!quit"):
                s.send(bytes("QUIT %s\r\n", "UTF-8"))
        for index, i in enumerate(line):
            print(line[index], index)
