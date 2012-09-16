from tornado.web import RequestHandler, asynchronous
from tornado.gen import Task, engine
import tornadoredis
import pickle
import simplejson as json

redis = tornadoredis.Client()
redis.connect()


class Toaster(RequestHandler):

    toast_num = 0

    @asynchronous
    @engine
    def post(self, new_toast):
        toast = pickle.loads(new_toast)

        self.toast_num += 1
        id = self.toast_num
        message = toast.message
        drink = toast.drink
        timestamp = toast.timestamp

        toast_dict = {"message": message, "drink": drink, "timestamp": timestamp}

        yield Task(redis.hmset, id, toast_dict)

    @asynchronous
    @engine
    def get(self, id):
        toast = yield Task(redis.hgetall, id)
        self.set_header("Content-Type", "application/json")
        self.write(json.dumps(toast))
