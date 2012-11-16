import os
import sys
import logging
import tornado.httpserver
import tornado.ioloop
import tornado.web
import pymongo
import pygeoip
from tornado.options import options, define
from handlers.pages import *
from handlers.toaster import *
from handlers.ws import *

PORT = sys.argv[1]

define("port", default=PORT, help="run on the given port", type=int)
define("debug", default=False, help="run tornado in debug mode", type=bool)


class Application(tornado.web.Application):
    def __init__(self):

        conn = pymongo.connection.Connection()
        self.db = conn['drimp']
        self.gic = pygeoip.GeoIP(os.path.abspath('static/data/GeoLiteCity.dat'))

        handlers = [
            # Page Handlers
            tornado.web.URLSpec(r'/', IndexHandler),
            tornado.web.URLSpec(r'/index', IndexHandler),
            tornado.web.URLSpec(r'/about', AboutHandler),
            tornado.web.URLSpec(r'/contact', ContactHandler),

            # API Handlers
            tornado.web.URLSpec(r'/api/toast', Toaster),
            tornado.web.URLSpec(r'/api/toast/([0-9]*)', Toaster),
            tornado.web.URLSpec(r'/api/websocket', WSHandler)
        ]

        current_dir = os.path.dirname(__file__)

        settings = dict(
            template_path=os.path.join(current_dir, 'templates'),
            static_path=os.path.join(current_dir, 'static'),
            debug=options.debug,
            autoescape='xhtml_escape'
        )

        super(Application, self).__init__(handlers, **settings)

        logging.info('Server started on port {0}'.format(options.port))

if __name__ == "__main__":
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
