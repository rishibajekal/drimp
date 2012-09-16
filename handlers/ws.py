import tornado.web
import tornado.websocket

websockets = []


class WSHandler(tornado.websocket.WebSocketHandler):

    def open(self):
        websockets.append(self)

    def on_message(self, message):
        for ws in websockets:
            ws.write_message(message)

    def on_close(self):
        websockets.remove(self)
