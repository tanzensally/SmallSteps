#!/usr/bin/env python3

import sys
import socket
import string
from threading import Timer

HOST = "irc.freenode.net"
PORT = 6667

NICK = 'record-o-bot'
IDENT = 'assword'
REALNAME = 'botNick'
MASTER = 'BotOwnerNick'
CHANNEL = "#botTesting"

readbuffer = ""

s=socket.socket( )
s.connect((HOST, PORT))

s.send(bytes("NICK "+ NICK + "\r\n", "UTF-8"));
s.send(bytes("USER "+ IDENT + " " + HOST + " " + REALNAME + ":This bot is a message machine.\r\n", "UTF-8"));
s.send(bytes("JOIN "+ CHANNEL + "\r\n", "UTF-8"));

s.send(bytes("PRIVMSG %s :Hello, testing 1 2 3\r\n" % MASTER, "UTF-8"))
    
messages = {}
haters = []

while 1:
    readbuffer = readbuffer+s.recv(512).decode("UTF-8")
    temp = str.split(readbuffer, "\n")
    readbuffer=temp.pop( )

    for line in temp:
        line = str.rstrip(line)
        line = str.split(line)

        if(line[0] == "PING"):
            s.send(bytes("PONG %s\r\n" % line[1], "UTF-8"))

        if(line[1] == "PRIVMSG"):
            sender = line[0][1:line[0].find('!')]
            if(line[3] == ":!record"):
                chan = sender if line[2] == NICK else CHANNEL
                if len(line) < 6:
                    s.send(bytes("PRIVMSG "+ chan + " :syntax -> !record <nick> <message>\r\n", "UTF-8"))
                    continue
                recipient = line[4]
                message = ' '.join(line[5:])
                if not recipient in messages:
                    messages[recipient] = {}
                messages[recipient][sender] = message
                s.send(bytes("PRIVMSG "+ sender + " :Message to %s was recorded.\r\n"%(recipient), "UTF-8"))
            elif(line[3] == ":!replay"):
                if not sender in messages:
                    messages[sender] = {}
                s.send(bytes("PRIVMSG "+ sender + " :You have %d messages.\r\n"%len(messages[sender]), "UTF-8"))
                for nick,message in messages[sender].items():
                    s.send(bytes("PRIVMSG "+ sender + " :%s: %s\r\n"%(nick,message), "UTF-8"))
            elif(line[3] == ":!clear"):
                messages[sender] = {}
                s.send(bytes("PRIVMSG "+ sender + " :Messages cleared.\r\n", "UTF-8"))
            elif(line[3] == ":!silent"):
                if not sender in haters:
                    haters.append(sender)
                s.send(bytes("PRIVMSG "+ sender + " :I will no longer bother you.  Tell me to !notify you if you want me to let you know about new messages.\r\n", "UTF-8"))
            elif(line[3] == ":!notify"):
                if sender in haters:
                    haters.remove(sender)
                s.send(bytes("PRIVMSG "+ sender + " :I will let you know when you have new messages when you connect.\r\n", "UTF-8"))
            elif(line[3] == ":!stats"):
                mtotal = 0
                ntotal = 0
                for msgs in messages.values():
                    if len(msgs) > 0:
                        ntotal+=1
                        mtotal+=len(msgs)
                chan = sender if line[2] == NICK else CHANNEL
                s.send(bytes("PRIVMSG "+ chan + " :I am holding %d messages for %d nicks.\r\n"%(mtotal,ntotal), "UTF-8"))
            elif(line[3] == ":!commands"):
                chan = sender if line[2] == NICK else CHANNEL
                s.send(bytes("PRIVMSG "+ chan + " :Commands: !record <nick> <message>, !replay, !clear, !silent, !notify, !stats\r\n", "UTF-8"))
        elif(line[1] == "JOIN"):
            user = line[0][1:line[0].find('!')]
            if user in messages and len(messages[user]) > 0 and user not in haters:
                s.send(bytes("PRIVMSG "+ user + " :You have %d messages.  To read them, tell me to !replay them. If you hate me, just tell me to be !silent.\r\n"%len(messages[user]), "UTF-8"))
        for index, i in enumerate(line):
            print(line[index],index)