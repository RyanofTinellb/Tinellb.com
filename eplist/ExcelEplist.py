from contextlib import contextmanager
import json


@contextmanager
def ignored(*exceptions):
    try:
        yield
    except exceptions:
        pass


def excelify(eplist):
    return '\n'.join(semicolonDelimited(entry) for entry in eplist)


def semicolonDelimited(entry):
    return ';'.join(open_entry(entry))


def open_entry(entry):
    output = []
    output.append(entry.get('meta', ''))

    value = entry.get('series')
    with ignored(AttributeError):
        value = value.get('name')
    value = value if isinstance(value, str) else ''
    output.append(str(value))

    value = entry.get('series')
    with ignored(AttributeError):
        value = value.get('number')
    value = value if isinstance(value, int) else 0
    output.append(str(value))

    value = entry.get('season')
    with ignored(AttributeError):
        value = value.get('name')
    value = value if isinstance(value, str) else ''
    output.append(str(value))

    value = entry.get('season')
    with ignored(AttributeError):
        value = value.get('number')
    value = value if isinstance(value, int) else 0
    output.append(str(value))

    try:
        value = entry['ep']['article']
    except:
        value = ''
    output.append(str(value))

    value = entry.get('ep')
    with ignored(AttributeError):
        value = value.get('name')
    value = value if isinstance(value, str) else ''
    output.append(str(value))

    value = entry.get('ep')
    with ignored(AttributeError):
        value = value.get('number')
    value = value if isinstance(value, int) else 0
    output.append(str(value))

    value = entry.get('location')
    with ignored(AttributeError):
        value = value.get('wallet')
    output.append(str(value))

    value = entry.get('location')
    try:
        value = value.get('disc')
    except AttributeError:
        value = 0
    output.append(str(value))

    value = entry.get('location')
    try:
        value = value.get('space')
    except AttributeError:
        value = 0
    output.append(str(value))

    value = entry.get('type', '')
    output.append(str(value))

    value = entry.get('multi', None)
    if isinstance(value, int):
        output.append(str(value))
        output.append('')
    elif isinstance(value, str):
        output.append('1')
        output.append(str(value))
    else:
        output.append('1')
        output.append('')

    try:
        value = entry['date']
        output.append(str(value))
    except KeyError:
        output.append('0')

    return output

def unexcelify(eplist):
    return '[' + ',\n'.join(jsonify(save_entry(entry)) for entry in eplist.splitlines()) + ']'

def jsonify(ep):
    return json.dumps(ep, ensure_ascii=False)

def save_entry(ep):
    sMeta, sSeries, nSeries, sSeason, nSeason, sEpArt, sEp, nEp, sWallet, nDisc, nSpace, sType, nMulti, sMulti, dDate = ep.split(
        ";")
    nSeries = int(nSeries)
    nSeason = int(nSeason)
    nEp = int(nEp)
    nDisc = int(nDisc)
    nSpace = int(nSpace)
    nMulti = int(nMulti)

    entry = {}
    if sMeta == sSeries or not sMeta:
        entry.pop('meta', None)
    else:
        entry['meta'] = sMeta

    def SEquals(sSeries, sEp):
        return sSeries == sEp or sSeries == sEp + ' (T)'

    if SEquals(sSeries, sEp):
        if nSeries:
            entry['series'] = nSeries
        else:
            entry.pop('series', None)
    else:
        if nSeries:
            entry['series'] = dict(name=sSeries, number=nSeries)
        else:
            entry['series'] = sSeries

    if sSeason:
        entry['season'] = dict(number=nSeason, name=sSeason)
    else:
        if nSeason:
            entry['season'] = nSeason
        else:
            entry.pop('season', None)

    if sMulti:
        entry['multi'] = sMulti
    elif nMulti != 1:
        entry['multi'] = nMulti
    else:
        entry.pop('multi', None)

    if nEp:
        if sEpArt:
            entry['ep'] = dict(number=nEp, article=sEpArt, name=sEp)
        else:
            entry['ep'] = dict(number=nEp, name=sEp)
    else:
        if sEpArt:
            entry['ep'] = dict(article=sEpArt, name=sEp)
        else:
            entry['ep'] = sEp

    if nDisc:
        if sWallet:
            entry['location'] = dict(disc=nDisc, wallet=sWallet, space=nSpace)
        else:
            entry['location'] = nDisc
    else:
        if sWallet:
            entry['location'] = dict(wallet=sWallet, space=nSpace)
        else:
            entry.pop('location', None)

    if sType:
        entry['type'] = sType
    else:
        entry.pop('type', None)

    entry['date'] = dDate
    pop_empty_values(entry)
    return(entry)


def pop_empty_values(dict_):
    for k, v in dict_.items():
        if isinstance(v, dict):
            take = []
            for a, b in v.items():
                if not b:
                    take.append(a)
            for elt in take:
                v.pop(elt)
            if len(v) == 1:
                dict_[k] = [t for t in v.values()][0]

filename = 'c:/users/ryan/onedrive/desktop/Semicolon delimited EpList.txt'
with open(filename, encoding='utf-8') as eplist:
    eplist = eplist.read()
eplist = unexcelify(eplist)
newName = 'C:/Users/Ryan/OneDrive/Desktop/Hopefully proper Eplist.json'
with open(newName, encoding='utf-8', mode='w') as excelEplist:
    excelEplist.write(eplist)
