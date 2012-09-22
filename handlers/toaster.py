from tornado.web import RequestHandler, asynchronous
import simplejson as json


class Toaster(RequestHandler):

    @asynchronous
    def post(self):
        new_toast = self.request.body
        toast = json.loads(new_toast)
        id = self.application.toast_num
        self.application.toast_num += 1
        message = toast['message']
        drink = toast['drink']
        timestamp = toast['timestamp']

        toast_dict = {"message": message, "drink": drink, "timestamp": timestamp}
        self.application.db.toasts.insert({'_id': id, 'data': toast_dict}, callback=self._post_callback)

    @asynchronous
    def get(self, toast_id=None):
        if toast_id is not None:
            id = int(toast_id)
            self.application.db.toasts.find_one({'_id': id}, callback=self._get_callback)
        else:
            self.application.db.toasts.find(sort=[('_id', 1)], callback=self._get_callback)

    def _post_callback(self, response, error):
        self.finish()

    @asynchronous
    def _get_callback(self, response, error):
        self.set_header("Content-Type", "application/json")
        toasts_dict = {}
        for entry in response:
            toasts_dict[entry['_id']] = entry['data']
        self.write(json.dumps(toasts_dict))
        self.finish()
