import json
import tkinter.ttk as ttk
import tkinter as Tk
import tkinter.simpledialog as sd
from urllib.request import urlopen as open_url
from contextlib import contextmanager


@contextmanager
def ignored(*exceptions):
    try:
        yield
    except exceptions:
        pass

class Wallet(Tk.StringVar):
    def __init__(self):
        super().__init__()


class Type(Tk.StringVar):
    def __init__(self):
        super().__init__()


class WalletBox(ttk.Combobox):
    def __init__(self, *args, **kwargs):
        values = ('Red Covered Wallet',
                  'Big Black Box',
                  'Pink and Light Grey Wallet',
                  'Black Leather Wallet',
                  'Yellow Wallet',
                  'Silver Box',
                  'Dark Blue Wallet',
                  'Brown Leather Wallet',
                  'Silver Wallet',
                  'Brown Box',
                  'Dark Blue Covered Wallet',
                  'Blue and Dark Gray Wallet',
                  'Black Box',
                  'Velcro Tabbed Black Wallet',
                  'Khaki Camoflage Covered Wallet')
        super().__init__(*args, **kwargs, values=values, width=20)


class TypeBox(ttk.Combobox):
    def __init__(self, *args, **kwargs):
        values = ('', 'Premiere', 'Start', 'Hiatus', 'Movie',
                  'Alone', 'Film', 'Back', 'End', 'Finale')
        super().__init__(*args, **kwargs, values=values)


class Spinbox(Tk.Spinbox):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, from_=0, to=1000, width=10, **kwargs)


class Entry(Tk.Entry):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, width=20, **kwargs)


def remove_empty_values(dict_):
    if isinstance(dict_, dict):
        f = remove_empty_values
        dict_ = {k: g for k, v in dict_.items() if (g := f(v))}
        if len(dict_) == 1:
            dict_ = [v for v in dict_.values()][0]
    return dict_


class ListEditor(Tk.Frame):
    def __init__(self, filename):
        super().__init__()
        with open(filename, encoding='utf-8') as eplist:
            self.eplist = json.load(eplist, encoding='utf-8')

        def move(num):
            num = self.position.get()
            for index, frame in enumerate(self.frames, start=num):
                while True:
                    try:
                        frame.open_entry(self.eplist[index])
                        break
                    except IndexError:
                        self.eplist += [{}]

        def up():
            self.position.set(max(self.position.get()-7, 0))
            move(None)

        def down(event=None):
            self.position.set(min(self.position.get()+7, 7000))
            move(None)

        def shift(event=None):
            (down if event.delta < 0 else up)()

        def save(event=None, filename=filename):
            for frame in self.frames:
                frame.save_entry()
            with open(filename, 'w', encoding='utf-8') as eplist:
                eps = ',\n'.join(
                    [json.dumps(x, ensure_ascii=False) for x in self.eplist if x and x['date'] != '00000000'])
                eplist.write(f'[{eps}]')

        def add(event=None):
            top = Tk.Toplevel(self)
            a = EpisodeAdder(top)
            a.pack()
            self.wait_window(top)
            self.eplist += a.return_value
            self.eplist.sort(key=epsorter)
        
        def sort_eplist(event=None):
            self.eplist.sort(key=epsorter)

        def epsorter(ep):
            series = ep.get('series')
            if isinstance(series, int):
                nSeries, series = series, ''
            elif isinstance(series, str):
                nSeries, series = 0, series
            elif isinstance(series, type(None)):
                nSeries, series = 0, ''
            else:
                nSeries, series = series['number'], series['name']

            meta = (ep.get('meta', series) or
                    (isinstance(p := ep.get('ep', 'zzzz'), dict) and p['name']) or
                    p)

            date = ep.get('date', '00000000')
            episode = ep.get('ep')
            number = episode.get('number') if isinstance(episode, dict) else 0

            return meta, nSeries, date, number

        self.frames = [EpisodeEditor(
            self.master, self.eplist, move) for x in range(7)]
        for row, frame in enumerate(self.frames):
            frame.bind('<MouseWheel>', shift)
            frame.grid(row=row, column=0)
        self.position = Tk.IntVar()
        self.scale = ttk.Scale(self.master, from_=0, to=7000, variable=self.position, command=move,
                               orient='vertical', length=500)
        self.scale.grid(row=0, rowspan=7, column=1)
        self.scale.bind('<MouseWheel>', shift)
        frame = Tk.Frame(self.master)
        Tk.Button(frame, text='⬆', command=up).grid(row=0, column=0)
        Tk.Button(frame, text='⬇', command=down).grid(row=1, column=0)
        Tk.Button(frame, text='Save', command=save).grid(row=2, column=0)
        Tk.Button(frame, text='Add', command=add).grid(row=3, column=0)
        Tk.Button(frame, text='Sort', command=sort_eplist).grid(row=4, column=0)
        frame.grid(row=0, column=2, rowspan=7, sticky='n')
        move(None)


obj = {Tk.StringVar: Tk.Entry, Tk.IntVar: Spinbox,
       Wallet: WalletBox, Type: TypeBox}


def clean(text):
    return text.replace('_', '').capitalize()


def pad(number, length):
    number = str(number)
    return '0' * (length - len(number)) + number


class EpisodeEditor(Tk.Frame):
    def __init__(self, master, entries, refresh):
        super().__init__(master)
        self.directory = dict(
            series=dict(meta=Tk.StringVar(),
                        series=Tk.StringVar(), number=Tk.IntVar()),
            season=dict(season=Tk.StringVar(), number=Tk.IntVar()),
            episode=dict(article=Tk.StringVar(),
                         episode=Tk.StringVar(), number=Tk.IntVar()),
            location=dict(disc=Tk.IntVar(), wallet=Wallet()),
            miscellaneous=dict(type_=Type(),
                               parts=Tk.IntVar(), section=Tk.StringVar()),
            date=dict(day=Tk.IntVar(), month=Tk.IntVar(), year=Tk.IntVar())
        )
        self.frames = {n: self.label_frame(n, f)
                       for n, f in self.directory.items()}
        for i, frame in enumerate(self.frames.values()):
            frame.grid(row=0, column=i, sticky='n')
        self.refresh = refresh
        self.entries = entries

    def label_frame(self, name, shape):
        frame = Tk.LabelFrame(self, text=clean(name))
        for row, (name, var) in enumerate(shape.items()):
            Tk.Label(frame, text=clean(name)).grid(
                row=row, column=0, sticky='w')
            obj[type(var)](frame, textvariable=var).grid(
                row=row, column=1, sticky='w')
        return frame

    def del_entry(self):
        with ignored(AttributeError, ValueError):
            self.entries.remove(self.entry)
            self.refresh()

    def open_entry(self, entry):
        self.entry = entry
        self.set_var('series', 'meta', entry.get('meta', ''))

        value = entry.get('series')
        with ignored(AttributeError):
            value = value.get('name')
        value = value if isinstance(value, str) else ''
        self.set_var('series', 'series', value)

        value = entry.get('series')
        with ignored(AttributeError):
            value = value.get('number')
        value = value if isinstance(value, int) else 0
        self.set_var('series', 'number', value)

        value = entry.get('season')
        with ignored(AttributeError):
            value = value.get('name')
        value = value if isinstance(value, str) else ''
        self.set_var('season', 'season', value)

        value = entry.get('season')
        with ignored(AttributeError):
            value = value.get('number')
        value = value if isinstance(value, int) else 0
        self.set_var('season', 'number', value)

        try:
            value = entry['ep']['article']
        except:
            value = ''
        self.set_var('episode', 'article', value)

        value = entry.get('ep')
        with ignored(AttributeError):
            value = value.get('name')
        value = value if isinstance(value, str) else ''
        self.set_var('episode', 'episode', value)

        value = entry.get('ep')
        with ignored(AttributeError):
            value = value.get('number')
        value = value if isinstance(value, int) else 0
        self.set_var('episode', 'number', value)

        value = entry.get('location')
        with ignored(AttributeError):
            value = value.get('wallet')
        self.set_var('location', 'wallet', value)

        value = entry.get('location')
        try:
            value = value.get('disc')
        except AttributeError:
            value = 0
        self.set_var('location', 'disc', value)

        value = entry.get('type', '')
        self.set_var('miscellaneous', 'type_', value)

        value = entry.get('multi', None)
        if isinstance(value, int):
            self.set_var('miscellaneous', 'parts', value)
            self.set_var('miscellaneous', 'section', '')
        elif isinstance(value, str):
            self.set_var('miscellaneous', 'parts', 0)
            self.set_var('miscellaneous', 'section', value)
        else:
            self.set_var('miscellaneous', 'parts', 0)
            self.set_var('miscellaneous', 'section', '')

        try:
            value = entry['date']
            self.set_var('date', 'day', int(value[-2:]))
            self.set_var('date', 'month', int(value[4:-2]))
            self.set_var('date', 'year', int(value[:4]))
        except KeyError:
            self.set_var('date', 'day', 0)
            self.set_var('date', 'month', 0)
            self.set_var('date', 'year', 0)

    def set_var(self, lat, long_, value):
        self.directory[lat][long_].set(value)

    def save_entry(self):
        sMeta = self.get_var('series', 'meta')
        sSeries = self.get_var('series', 'series')
        nSeries = self.get_var('series', 'number')
        nSeason = self.get_var('season', 'number')
        sSeason = self.get_var('season', 'season')
        sMulti = self.get_var('miscellaneous', 'section')
        nEp = self.get_var('episode', 'number')
        sEpArt = self.get_var('episode', 'article')
        sEp = self.get_var('episode', 'episode')
        nDisc = self.get_var('location', 'disc')
        nMulti = self.get_var('miscellaneous', 'parts')
        sWallet = self.get_var('location', 'wallet')
        dDate = ''.join([pad(self.get_var('date', x), l)
                         for x, l in (('year', 4), ('month', 2), ('day', 2))])
        sType = self.get_var('miscellaneous', 'type_')

        if sMeta == sSeries or not sMeta:
            self.entry.pop('meta', None)
        else:
            self.entry['meta'] = sMeta

        def SEquals(sSeries, sEp):
            return sSeries == sEp or sSeries == sEp + ' (T)'

        if SEquals(sSeries, sEp):
            if nSeries:
                self.entry['series'] = nSeries
            else:
                self.entry.pop('series', None)
        else:
            if nSeries:
                self.entry['series'] = dict(name=sSeries, number=nSeries)
            else:
                self.entry['series'] = sSeries

        if sSeason:
            self.entry['season'] = dict(number=nSeason, name=sSeason)
        else:
            if nSeason:
                self.entry['season'] = nSeason
            else:
                self.entry.pop('season', None)

        if sMulti:
            self.entry['multi'] = sMulti
        elif nMulti:
            self.entry['multi'] = nMulti
        else:
            self.entry.pop('multi', None)

        if nEp:
            if sEpArt:
                self.entry['ep'] = dict(number=nEp, article=sEpArt, name=sEp)
            else:
                self.entry['ep'] = dict(number=nEp, name=sEp)
        else:
            if sEpArt:
                self.entry['ep'] = dict(article=sEpArt, name=sEp)
            else:
                self.entry['ep'] = sEp

        if nDisc:
            if sWallet:
                self.entry['location'] = dict(disc=nDisc, wallet=sWallet)
            else:
                self.entry['location'] = nDisc
        else:
            if sWallet:
                self.entry['location'] = sWallet
            else:
                self.entry.pop('location', None)

        if sType:
            self.entry['type'] = sType
        else:
            self.entry.pop('type', None)

        self.entry['date'] = dDate

    def get_var(self, lat, long_):
        return self.directory[lat][long_].get()


col = [-1]


def next_col(col=col):
    col[0] += 1
    return dict(row=0, column=col[0], sticky='n')


def first_col(col=col):
    col[0] = 2
    return dict(row=0, column=col[0], sticky='n')


class EpisodeAdder(Tk.Frame):
    def __init__(self, master=None):
        super().__init__(master)
        self.return_value = {}
        self.master.title('Adding Episodes')
        self.show_search()

    def show_search(self):
        self.search = Tk.StringVar()
        Tk.Label(self, text='Search:').grid(**next_col())
        e = Tk.Entry(self)
        e.grid(**next_col())
        e.bind('<Return>', self.show_shows)

    def show_shows(self, event=None):
        search = event.widget.get()
        page = json.load(
            open_url(f'http://api.tvmaze.com/search/shows?q={search}'))
        self.shows = {p['show']['name']: p['show']['id'] for p in page}
        Tk.Label(self, text='Shows:').grid(**first_col())
        k = ttk.Combobox(self, values=list(self.shows))
        k.grid(**next_col())
        k.bind('<<ComboboxSelected>>', self.show_seasons)
        k.focus_set()

    def show_seasons(self, event):
        self.attributes_area.grid(**next_col())
        self.show = event.widget.get()
        show = self.shows[self.show]
        page = json.load(
            open_url(f'http://api.tvmaze.com/shows/{show}/seasons'))
        self.seasons = {p['number']: p['id'] for p in page}
        Tk.Label(self, text='Seasons:').grid(**next_col())
        self._seasons_box.grid(**next_col())

    @property
    def _seasons_box(self):
        box = Tk.Listbox(self, selectmode='multiple')
        [box.insert('end', g) for g in self.seasons]
        box.bind('<Return>', self.finish)
        return box

    @property
    def attributes_area(self):
        frame = Tk.Frame(self)
        self.series_info = dict(metaseries=Tk.StringVar(), name=Tk.StringVar(),
                                number=Tk.IntVar(), wallet=Wallet())
        for row, (name, var) in enumerate(self.series_info.items()):
            Tk.Label(frame, text=clean(name)).grid(
                row=row, column=0, sticky='w')
            obj[type(var)](frame, textvariable=var).grid(
                row=row, column=1, sticky='w')
        return frame

    def finish(self, event):
        box = event.widget
        page = []
        for season in box.curselection():
            season = self.seasons[box.get(season)]
            season = json.load(
                open_url(f'http://api.tvmaze.com/seasons/{season}/episodes'))
            page.extend(season)
        self.return_value = map(self.entry, page)
        self.master.destroy()

    def entry(self, page):
        output = {}
        series = {k: v.get() for k, v in self.series_info.items()}
        output['meta'] = series['metaseries']
        output['series'] = dict(
            name=series['name'], number=series['number'])
        output['season'] = page['season']
        output['ep'] = self._article_episode(page)
        output['location'] = dict(wallet=series['wallet'])
        output['date'] = page['airdate'].replace('-', '')
        return remove_empty_values(output)

    def _article_episode(self, ep):
        name = ep['name']
        number = ep['number']
        for article in ('The', 'A', 'An'):
            if name.startswith(art := article + ' '):
                name = name.replace(art, '', 1)
                break
        else:
            article = ''
        return dict(article=article, name=name, number=number)


f = 'c:/users/ryan/tinellbianlanguages/toplevel/eplist.json'
g = ListEditor(f)
g.mainloop()