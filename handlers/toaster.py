from tornado.web import RequestHandler, asynchronous
from tornado.gen import Task, engine
import tornadoredis
import pickle
import simplejson as json

c = tornadoredis.Client()
c.connect()


class Toaster(RequestHandler):

    def post(self, message, drink, timestamp):
        # store the information into redis

        # return whether the post was sucessful or not

    @asynchronous
    @engine
    def get(self, id):
        response = yield Task(c.get, id)
        toast = pickle.loads(response)
        self.set_header("Content-Type", "application/json")
        self.write(json.dumps(toast))
