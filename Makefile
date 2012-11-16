.PHONY: all init clean

all: init
	python server.py 8888 local --debug=True

init:
	pip install -r requirements.txt

clean:
	rm -rf dist *egg*
