import os
import logging
import tornado.httpserver
import tornado.ioloop
import tornado.web
from tornado.options import options, define
from handlers.index import *
from handlers.toaster import *

define("port", default=8888, help="run on the given port", type=int)
define("debug", default=True, help="run tornado in debug mode", type=bool)


class Application(tornado.web.Application):
    def __init__(self):

        handlers = [
            tornado.web.URLSpec(r'/', IndexHandler),
            tornado.web.URLSpec(r'/index', IndexHandler),
            tornado.web.URLSpec(r'/toast/([0-9]+)', Toaster)
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
