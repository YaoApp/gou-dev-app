all: clean plugin

plugin: 
	go build -o ./macos/user.so ./user
	chmod +x ./macos/user.so

linux:
	GOOS=linux  GOARCH=amd64 go build -o ./linux/user.so ./user
	chmod +x ./linux/user.so

clean:
	rm -rf ./dist