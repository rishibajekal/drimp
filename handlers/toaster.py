from tornado.web import RequestHandler, asynchronous
import simplejson as json


class Toaster(RequestHandler):

    @asynchronous
    def post(self):
        db_toasts = self.application.db['toasts']
        db_metadata = self.application.db['metadata']

        new_toast = self.request.body
        toast = json.loads(new_toast)
        print toast
        id = 0
        results = db_metadata.find_one({'_id': 'toast_num'})
        if results is None:
            id = 0
        else:
            id = results['num']
        id += 1
        db_metadata.save({'_id': 'toast_num', 'num': id})
        message = toast['message']
        drink = toast['drink']
        timestamp = toast['timestamp']

        toast_dict = {"message": message, "drink": drink, "timestamp": timestamp, "comments": {}}
        db_toasts.insert({'_id': id, 'data': toast_dict})
        self.finish()

    @asynchronous
    def get(self, toast_id=None):
        db_toasts = self.application.db['toasts']

        self.set_header("Content-Type", "application/json")
        if toast_id is not None:
            id = int(toast_id)
            db_toasts.find_one({'_id': id})
        else:
            response = db_toasts.find(sort=[('_id', 1)])
            toasts_dict = {}
            for entry in response:
                toasts_dict[entry['_id']] = entry['data']
            self.write(json.dumps(toasts_dict))
            self.finish()
