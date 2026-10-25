# Local preview server. Same as "python -m http.server 8080", but tells the browser
# to re-check files on every load so edited logos/text never show a stale cached copy.
import http.server


class NoStaleHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


http.server.test(HandlerClass=NoStaleHandler, port=8080)
