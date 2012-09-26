from tornado.web import RequestHandler


class IndexHandler(RequestHandler):
    def get(self):
        self.render("index.html")


class AboutHandler(RequestHandler):
    def get(self):
        self.render("about.html")


class ContactHandler(RequestHandler):
    def get(self):
        self.render("contact.html")
