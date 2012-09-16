from tornado.web import RequestHandler, asynchronous
from tornado.gen import Task, engine
import simplejson as json


class Toaster(RequestHandler):

    @asynchronous
    @engine
    def post(self):
        new_toast = self.request.body
        toast = json.loads(new_toast)

        self.application.toast_num += 1
        id = 'id' + str(self.application.toast_num)
        message = toast['message']
        drink = toast['drink']
        timestamp = toast['timestamp']

        toast_dict = {"message": message, "drink": drink, "timestamp": timestamp}
        yield Task(self.application.redis.hmset, id, toast_dict)

        self.finish()

    @asynchronous
    @engine
    def get(self, toast_id):
        toast = yield Task(self.application.redis.hgetall, {"id": "id" + str(toast_id)})
        self.set_header("Content-Type", "application/json")
        self.write(json.dumps(toast))
