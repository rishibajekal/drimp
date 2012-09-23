from tornado.web import RequestHandler, asynchronous
import simplejson as json


class Toaster(RequestHandler):

    @asynchronous
    def post(self):
        new_toast = self.request.body
        toast = json.loads(new_toast)
        results = self.application.db.metadata.find_one({'_id': 'toast_num'})
        if results is None:
            id = 0
        id += 1
        self.application.db.metadata.update({'_id': 'toast_num'}, {'$inc': {'num': 1}})
        message = toast['message']
        drink = toast['drink']
        timestamp = toast['timestamp']

        toast_dict = {"message": message, "drink": drink, "timestamp": timestamp, "comments": {}}
        self.application.db.toasts.insert({'_id': id, 'data': toast_dict})
        self.finish()

    @asynchronous
    def get(self, toast_id=None):
        self.set_header("Content-Type", "application/json")
        if toast_id is not None:
            id = int(toast_id)
            self.application.db.toasts.find_one({'_id': id})
        else:
            response = self.application.db.toasts.find(sort=[('_id', 1)])
            toasts_dict = {}
            for entry in response:
                toasts_dict[entry['_id']] = entry['data']
            self.write(json.dumps(toasts_dict))
            self.finish()
