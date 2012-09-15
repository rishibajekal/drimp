from tornado.web import RequestHandler


class Toaster(RequestHandler):
    def post(self, message, drink, timestamp):
        # store the information into redis

        # return if the post was sucessful or not