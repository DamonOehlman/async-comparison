for dir in  $(find child-dirs -type d -maxdepth 1 -mindepth 1); do
  printf "${dir}\n";
  if [[ -f "${dir}/package.json" ]]; then
    cd "${dir}" && npm install
  fi;
  node "${dir}"
done