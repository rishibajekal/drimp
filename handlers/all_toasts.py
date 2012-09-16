from tornado.web import RequestHandler, asynchronous
from tornado.gen import Task, engine
import simplejson as json


class AllToasts(RequestHandler):

    @asynchronous
    @engine
    def get(self):
        toast_num = self.application.toast_num
        toast_dict = {}

        for i in xrange(1, toast_num + 1):
            id = "id" + str(i)
            toast = yield Task(self.application.redis.hgetall, id)
            toast_dict[id] = toast

        self.set_header("Content-Type", "application/json")
        self.write(json.dumps({"type": "init",
                               "data": {"num_toasts": toast_num, "toasts": toast_dict}
                               }))
        self.finish()
