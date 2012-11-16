from tornado.web import RequestHandler, asynchronous
import simplejson as json


class Toaster(RequestHandler):

    @asynchronous
    def post(self):
        self.set_header("Content-Type", "application/json")
        db_toasts = self.application.db['toasts']
        db_metadata = self.application.db['metadata']

        new_toast = self.request.body
        address = self.request.remote_ip
        if address is None:
            address = ""
        #address = '216.239.55.195'
        toast = json.loads(new_toast)

        id = 0
        results = db_metadata.find_one({'_id': 'toast_num'})
        if results is None:
            id = 0
        else:
            id = results['num']
        id += 1

        record = self.application.gic.record_by_addr(address)

        db_metadata.save({'_id': 'toast_num', 'num': id})
        message = toast['message']
        drink = toast['drink']
        timestamp = toast['timestamp']
        location = record["city"]

        toast_dict = {"_id": id, "message": message, "drink": drink, "timestamp": timestamp, "location": location}
        db_toasts.insert({'_id': id, 'data': toast_dict})
        self.write(json.dumps(toast_dict))
        self.finish()

    @asynchronous
    def get(self, toast_id=None):
        db_toasts = self.application.db['toasts']
        self.set_header("Content-Type", "application/json")

        toasts_list = []

        if toast_id is None:
            response = db_toasts.find().sort('_id', -1).limit(10)
            for entry in response:
                toasts_list.append(entry['data'])
        else:
            response = db_toasts.find({'$where': 'this._id < ' + str(toast_id)}).sort('_id', -1).limit(10)
            for entry in response:
                toasts_list.append(entry['data'])
            toasts_list
        self.write(json.dumps(toasts_list))
        self.finish()
