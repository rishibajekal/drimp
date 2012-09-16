from tornado.web import RequestHandler, asynchronous
from tornado.gen import Task, engine
import tornadoredis
import simplejson as json

redis = tornadoredis.Client()
redis.connect()

toast_num = 0


class Toaster(RequestHandler):

    @asynchronous
    @engine
    def post(self):
        global toast_num
        new_toast = self.request.body
        toast = json.loads(new_toast)

        toast_num += 1
        id = 'id' + str(toast_num)
        message = toast['message']
        drink = toast['drink']
        timestamp = toast['timestamp']

        toast_dict = {"message": message, "drink": drink, "timestamp": timestamp}

        yield Task(redis.hmset, id, toast_dict)

    @asynchronous
    @engine
    def get(self, id):
        toast = yield Task(redis.hgetall, id)
        self.set_header("Content-Type", "application/json")
        self.write(json.dumps(toast))
