Name:           pdc-contact-browser
Version:        2.0.0
Release:        1%{?dist}
Summary:        Web UI for pdc's contact
Group:          Development/Libraries
License:        MIT
URL:            https://github.com/product-definition-center/pdc-contact-browser
Source0:        %{name}-%{version}.tar.gz
BuildArch:      noarch

%description
Web UI for viewing pdc contact

%prep
%setup -q -n %{name}-%{version}

%install
cp -R var/ %{buildroot}/

%files
%defattr(-,root,root)
/var/www/html/%{name}

%changelog
* Wed Jan 24 2018 Lubomír Sedlář <lsedlar@redhat.com> 2.0.0-1
- Bump version (lsedlar@redhat.com)
- Fix vulnerable dependency (lholecek@redhat.com)
- Update npm modules when package.json changes (lholecek@redhat.com)
- Remove support for release components (lholecek@redhat.com)
- Fix tab panel layout sizes (lholecek@redhat.com)
- Add permission information (lsedlar@redhat.com)
- Fix archive name (lholecek@redhat.com)
- Allow updating version using Makefile (lholecek@redhat.com)
- Fix contact type identifiers (lsedlar@redhat.com)
- Make "Create New Contact" text consistent (lholecek@redhat.com)
- Add footer showing application version (lholecek@redhat.com)
- Add form for creating new contacts (lsedlar@redhat.com)
- Set header style without delay (lholecek@redhat.com)
- Remove user configuration from repo (lholecek@redhat.com)
- Load username and mail name (lsedlar@redhat.com)
- Optimize queries to fill filter popups (lholecek@redhat.com)
- Fix caching contacts (lholecek@redhat.com)
- Create assets archive for packaging (lholecek@redhat.com)
- Fix webpack prod config (lsedlar@redhat.com)
- Increase page size to 20 (lsedlar@redhat.com)
- Revert "Add assets for packaging." (lholecek@redhat.com)
- Fix whitespace in changelog (lholecek@redhat.com)
- Add url-loader dev dependency (lsedlar@redhat.com)
- Add documentation for customization to README (lsedlar@redhat.com)
- Use PatternFly for menu (lsedlar@redhat.com)
- Add optional links to top right corner (lsedlar@redhat.com)
- Allow overriding visual look in server settings (lsedlar@redhat.com)
- Add contact filter (lholecek@redhat.com)
- Allow searching for global and release components (lholecek@redhat.com)
- Bump uglify-js version (lholecek@redhat.com)
- Fix updating contacts for global components (lholecek@redhat.com)
- Change README.markdown as serversetting.json location changed
  (chuzhang@redhat.com)

* Thu Dec 22 2016 Chuang Zhang <chuzhang@redhat.com> 1.2.0-1
- new package built with tito
- fix bugs
- add assets for packaging

* Wed Aug 10 2016 Chuang Zhang <chuzhang@redhat.com> 1.1.0-1
- Change README.markdown and remove Makefile.
- Improve the styles of contact browser
- Replace old jquery syntax with new one
- Remove redundant props passing
- Remove redundant css file
- Make network error dialog include resource info
- Allows users to edit contact info continuously
- Keep the lastest values after updating contact record
- Correct the position of table loading spinner
- Replace role drop-down list with react select component
- Refactor the loading spinner of loadForm
- Apply patternfly theme to Contact Browser
- Enables browser backwards/forwards button to perform pagination
- Correct the webpack config file
- Refactor webpack config file for building
- Append editing pane to table-toolbar

* Wed May 11 2016 Chuang Zhang <chuzhang@redhat.com> 1.0.0-2
- Bump Release to 2%{?dist}

* Wed May 11 2016 Chuang Zhang <chuzhang@redhat.com> 1.0.0-1
- Add New and Delete feature for contact browser. (chuzhang@redhat.com)
- Allow linking to particular result page in contact browser. (chuzhang@redhat.com)

* Wed Mar 9 2016 Chuang Zhang <chuzhang@redhat.com> 0.1.0-1
- init spec for pdc contact browser
